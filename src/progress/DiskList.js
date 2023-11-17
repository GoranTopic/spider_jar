import { read_json, write_json, mkdir } from '../utils/files.js'
import options from '../options.js'

// get data directory
let data_directory =  options.host_data_dir;

/* this class make a list that is saved disk, and or read from */
class DiskList{
	constructor(name, values = null, path = null){
		this.dir_path = path? path : data_directory + '/resources/list';
		mkdir(this.dir_path);
		this.name = name + ".json";
		this.filename = this.dir_path + '/' + this.name
		// try to read already saved values 
		if(values){ // if values have be passed
			this.values = values;
			write_json(this.values, this.filename);
		}else // try to read from disk
			this.values = read_json( this.filename) ?? [];
	}

	// save value
	add = value => {
		this.values.push(value);
		return write_json(this.values, this.filename);
	}

	// remove value
	remove = value => {
		let index = this.values.indexOf(value);
		if(index > -1){
			this.values.splice(index, 1);
			return write_json(this.values, this.filename);
		}else{
			console.error(`value ${value} not found in DiskLiast`)
			return false
		}
	}

	// values 
	getValues = () => this.values

	// check if a passed value in on the list
	checkValue = value => this.values.some(v => value === v)

	// values count
	valuesCount = () => this.values.length

}

export default DiskList;

