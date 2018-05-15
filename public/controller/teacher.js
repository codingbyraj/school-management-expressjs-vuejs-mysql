let app=new Vue({
    el:"#div_teacher",
    data:{
        teacherName:'',
        teacherEmail:'',
        teacherMobile:'',
        teacherId:'',
        teachers:[],
    },
    methods:{
        getAllTeachers(){            
            axios.get('/teachers')
            .then((response)=>{
                app.teachers = response.data.teachers;
            })
            .catch((err)=>{
                console.log(err)
            })
        },
        addNewTeacher(){
            axios.post('/teachers/addteacher', {
                name: app.teacherName,
                email: app.teacherEmail,
                mobile:app.teacherMobile
            })

            .then((res)=>{
                if(res.data.success)
                alert("added to db")

                app.getAllTeachers();
            })
            .catch((err)=>{
                console.log(err)
            })
        },
        getBatchesOfTeacher(){
            let teacherId = app.teacherId;
            axios.get('/teachers/' + teacherId + "/batches")
            .then((res)=>{
                console.log(res.data)
            })
            .catch((err)=>{
                console.log(err)
            })            
        }
    }
})
