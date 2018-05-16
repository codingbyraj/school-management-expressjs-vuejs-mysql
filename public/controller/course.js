let app = new Vue({
    el: '#div_course',
    data: {
        coursearr: [],
        CourseName: '',
        courseId:'',
        batches:""
    },
    methods: {
        // get all courses
        getAllCourses() {
            axios.get('/courses')
                .then((response) => {
                    app.coursearr = response.data.courses;                
                })
                .catch((err) => {
                    console.log(err.response)
                })
        },
        // add a new course
        addnewCourse() {
            axios.post('/courses/addcourse', {
                    name: app.CourseName
                })

                .then((res) => {
                    if (res.data.success)
                        alert("added to db");
                        
                        app.getAllCourses();
                })
                .catch((err) => {
                    console.log(err.res)
                })
        },
        // get batches by course
        getBatchesByCourse(){
            let courseId = app.courseId;
            let url = 'courses/' + courseId + '/batches';
            console.log(url)
            axios.get(url)
            .then((res)=>{
                // console.log(res.data.batches)
                app.batches = res.data.batches;
            })
            .catch((error)=>{
                console.log("Error", error.res)
            })
        }
    }
});


