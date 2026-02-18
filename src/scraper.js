import { chromium } from 'playwright'

const TIMEOUT_REVIEW = 100
const MAX_RETRIES = 30
const MAX_RETRIES_MOV = 80

async function scrape(url, cedula) {
    const browser = await chromium.launch()
    const page = await browser.newPage()

    await page.goto(url)

    const selector = '[id="form:j_idt57_data"] > tr:first-child > td:first-child'

    const firstCell = page.locator(selector)
    const textoInicial = await firstCell.innerText()
    const textoNuevo = "Cargando..."
    console.log("Texto inicial:", textoInicial)
    await firstCell.evaluate((el, value) => {
        el.innerText = value
    }, textoNuevo)

    await page.fill('[id="form:t_texto_cedula"]', cedula)
    await page.press('[id="form:t_texto_cedula"]', 'Enter')

    let textoResultado = ""
    let retries = 0
    while (true) {
        await page.waitForTimeout(TIMEOUT_REVIEW)
        const newCell = page.locator(selector)
        textoResultado = await newCell.innerText()
        if (textoResultado !== textoNuevo) {
            break
        }
        retries++
        if (retries >= MAX_RETRIES) {
            console.log("Tiempo de espera agotado para la cédula:", cedula)
            await browser.close()
            return {
                cedula: cedula,
                date: new Date().toISOString(),
                estado: "error",
                error: "Tiempo de espera agotado",
                resultado: []
            }
        }
    }
    if (textoResultado.includes("No se encontraron resultados")) {
        console.log("No se encontraron resultados para la cédula:", cedula)
        await browser.close()
        return {
            cedula: cedula,
            date: new Date().toISOString(),
            estado: "error",
            error: "No se encontraron resultados",
            resultado: []
        }
    }

    console.log("Texto Final:", textoResultado)
    let data = []
    let rows = page.locator('[id="form:j_idt57_data"] > tr')
    let count = await rows.count()

    for (let i = 0; i < count; i++) {

        rows = page.locator('[id="form:j_idt57_data"] > tr')
        const row = rows.nth(i)
        const cells = row.locator('td')

        let resultRow = {
            cod_tarjeta: await cells.nth(0).innerText(),
            num_proceso: await cells.nth(1).innerText(),
            dependencia: await cells.nth(2).innerText(),
            tipo: await cells.nth(3).innerText(),
            detalle: await cells.nth(4).innerText(),
            movimientos: []
        }
        await row.locator('button:has-text("Ver")').click()

        retries = 0
        let rowsTestLength = 0
        while (true) {
            await page.waitForTimeout(TIMEOUT_REVIEW)
            const rowsTest = await page.$$('[id="form:j_idt110_data"] tr')
            rowsTestLength = rowsTest.length
            if (rowsTestLength > 0) {
                break
            }
            retries++
            if (retries >= MAX_RETRIES_MOV) {
                data.push(resultRow)
                await page.click('[id="form:j_idt136"]')
                continue
            }
        }
        console.log("Movimientos:", rowsTestLength)

        const dataList = await page.$$eval(
            '[id="form:j_idt110_data"] > tr',
            rowsMov => rowsMov.map(rowMov => {
                const cellsMov = rowMov.querySelectorAll('td')
                return {
                    num: cellsMov[0]?.innerText.trim(),
                    fecha: cellsMov[1]?.innerText.trim(),
                    anio: cellsMov[2]?.innerText.trim(),
                    mes: cellsMov[3]?.innerText.trim(),
                    concepto: cellsMov[4]?.innerText.trim(),
                    estado: cellsMov[5]?.innerText.trim(),
                    deuda: cellsMov[6]?.innerText.trim(),
                    pagado: cellsMov[7]?.innerText.trim()
                }
            })
        )

        resultRow.movimientos = dataList
        data.push(resultRow)
        await page.click('[id="form:j_idt136"]')
    }

    await browser.close()
	
    return {
        cedula: cedula,
        date: new Date().toISOString(),
        estado: "success",
        error: null,
        resultado: data
    }
}

(async () => {
    const result = await scrape('https://supa.funcionjudicial.gob.ec/pensiones/publico/consulta.jsf',
		'0916576796'
		//'0931488605'
    )
    console.log(result)
})()


