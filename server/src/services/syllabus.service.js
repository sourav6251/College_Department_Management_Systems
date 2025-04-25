import { Syllabus } from "../model/syllabus.model.js";

class SyllabusService {
    async createSyllabus(data) {
        let syllabus ;
        console.log('Enter  into syllabus ',data);
        try{syllabus= await Syllabus.create(data);}
        catch(error){
            console.log("error=>",error);
            
        }
        console.log('Enter  into syllabus ',syllabus);
        return syllabus;
    }

    async updateSyllabus(data, id) {
        const syllabus = await Syllabus.findByIdAndUpdate(id, data, { new: true });
        return syllabus;
    }

    // async showSyllabus({ department, semester, paperCode }) {
    async showSyllabus(data) {
        console.log(`data.departmentid skd=>`,data);
        const department = data.department;
        // const semester = data.semester;
        // const paperCode = data.paperCode;
        const filter = { department };
        // if (semester) filter.semester = semester;
        // if (paperCode) filter.paperCode = paperCode;
let syllabus
        try{ syllabus = await Syllabus.find({ department: data });}
        catch(error){
            console.log(error);
            
        }
        console.log(`syllabus skd=>${syllabus}`);
        

        return syllabus || null;
    }

    async deleteSyllabus(id) {
        const result = await Syllabus.findByIdAndDelete(id);
        return result;
    }
}
export default new SyllabusService();
