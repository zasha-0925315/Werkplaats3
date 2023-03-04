async function get_students(){
    try {
        const response = await fetch('../api/student');
        const student = await response.json();
        
        console.log(`${JSON.stringify(student)}`);

    } catch(error) {
        console.log(error);
    }
}

get_students();