window.addEventListener('DOMContentLoaded', () => {

    const person = {};

    Object.defineProperties(person, {
        name: {
            value: 'JC',
            writable: true,
        },
        age: {
            value: 24,
            writable: false,
        },
    });

    person.name = "VK";
    person.age = 34;

    console.log(person.name);
    console.log(person.age);

    console.log('////////////////////////////////////////////////////////////////////////');

    const form = document.querySelector('#userForm');
    const usersArray = JSON.parse(localStorage.getItem('users')) || [];
    let currentId = 0;

    if(usersArray.length) {
        currentId = usersArray[usersArray.length - 1].id + 1
    }

    usersArray.forEach(user => addRow(user))
    console.log(usersArray);

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        let errors = [];

        let inputName = this.querySelector('input[name="name"]');
        let inputRole = this.querySelector('input[name="role"]');
        let inputIsActive = this.querySelector('input[name="isActive"]');
        let inputIsAvailable = this.querySelector('input[name="isAvailable"]');
        let errorsContainer = this.querySelector('div.errors');
        errorsContainer.innerText = '';
        let nameValue = inputName.value.trim();
        let roleValue = inputRole.value.trim();

        if(!nameValue)
            errors.push('Name should not be empty')

        if(!(nameValue.length >= 3 && nameValue.length <= 32))
            errors.push('Name should be between 3 and 32 symbols');

        if(!roleValue)
            errors.push('Role should not be empty');

        if(!(roleValue.length >= 3 && roleValue.length <= 20))
            errors.push('Role must be between 3 and 20 symbols');

        if(errors.length) {
            errors.forEach(error => {
                errorsContainer.innerText += `${error} \n`;
            });

            return;
        }

        let user = {
            id: currentId,
            name: nameValue,
            role: roleValue,
            isActive: inputIsActive.checked,
            isAvailabe: inputIsAvailable.checked,
        }

        currentId++;
        usersArray.push(user);
        localStorage.setItem('users', JSON.stringify(usersArray));
        addRow(user);

        inputName.value = '';
        inputRole.value = '';
        inputIsActive.checked = false;
        inputIsAvailable.checked = false;
    })

    function addRow(user) {
        const tr = document.createElement('tr');
        Object.keys(user).forEach(key => {
            let td = document.createElement('td');
            td.innerText = user[key];

            tr.append(td);
        })

        document.querySelector('#users tbody').append(tr);
    }

    // localStorage.clear()
    

});

    