let app=new Vue({
    el:"#div_students",
    data:{
        studentName:'',
        studentEmail:'',
        studentMobile:'',
        studentId:'',
        students:[],
        studId:'',
        studentDetail : '',
        batches:''
    },
    methods:{
        //  get all students' details
        getAllStudents(){            
            axios.get('/students')
            .then((response)=>{
                app.students = response.data.students;                
            })
            .catch((err)=>{
                console.log(err)
            })
        },
        // add a new student to db
        addnewStudent(){
            axios.post('/students/addstudent', {
                name: app.studentName,
                email: app.studentEmail,
                mobile:app.studentMobile
            })

            .then((res)=>{
                if(res.data.success)
                alert("added to db")
            })
            .catch((error)=>{
                console.log(error)
            })
        },
        // get details of a perticular student
        getStudentById(){
            axios.get('/students/'+ app.studentId)
            .then((response)=>{
                app.studentDetail = response.data.students;                
            })
            .catch((error)=>{
                console.log(error);
            })
        },
        // get batches of sudent
        getBatchesOfStudent(stud){
            axios.get('/students/'+stud+'/batches')
            .then((res)=>{                
                console.log(res);
                batches = res.data.batches;
            })
            .catch((error)=>{
                console.log("Error")
            })
        }
    }
});