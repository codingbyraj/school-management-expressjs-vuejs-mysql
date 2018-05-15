let app = new Vue({
    el: "#div_subject",
    data: {
        subjectName: '',
        subjects: []
    },
    methods: {
        getAllSubjects() {
            axios.get('/subjects')
                .then((res) => {
                    app.subjects = res.data.subjects;
                })
                .catch((err) => {
                    console.log(err)
                })
        },
        addNewSubject() {
            axios.post('/subjects/addsubject', {
                    name: app.subjectName
                })

                .then((res) => {
                    if (res.data.success)
                        alert("added to db")

                    app.getAllSubjects();
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }
})