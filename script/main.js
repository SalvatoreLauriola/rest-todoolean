// Descrizione:
// Creazione di una todo list con le seguenti funzionalità, attraverso l’uso delle API, AJAX, jQuery e Handlebars
// Lettura di tutti i todo
// Creazione nuovo todo
// Cancellazione todo

$(document).ready(function() {

// Refs

var input = $(".input");

var button = $("#todo-btn");

var list = $(".todos");

var urlApi = 'http://157.230.17.132:3007/todos';

// Init Handlebars

var source = $('#todo-template').html();
var template = Handlebars.compile(source);

// Stampo todos

printTodos(urlApi, template, list);

//nuovo todo item

input.keyup(function(event){
    if(event.which === 13){
    create (urlApi, template, list, input);
    }
})

button.click(function(){
    create (urlApi, template, list, input);
})

$(document).on('click', '.remove', function () {
    remove(urlApi, template, list, $(this));
});

}) // fine doc ready

// Functions // 

function printTodos(urlApi, template, list){
    list.html('');

    $.ajax({
        url: urlApi,
        method: 'GET',
        success: function(data) {
        var todos = data;
        
        for (var i = 0; i < todos.length; i++) {
            var todo = todos[i];
            
            var context = {
            todo: todo.text,
            id: todo.id
            }
            
            var html = template(context);
            list.append(html);
        }
        $('.input').val('');
        
    },
    error: function() {
        console.log('Si è verificato un errore');
    }
});
}


function create (urlApi, template, list, todoValue) {
    var todoValue = todoValue.val().trim();
    if(todoValue !== '') {
        $.ajax ({
            url: urlApi,
            method: 'POST',
            data: {
                text: todoValue
            },
            success:function() {
                printTodos(urlApi, template, list);
    
            },
            error: function() {
                console.log('Si è verificato un errore nella creazione')
            }
        })  
    }else {
        alert('Inserisci un valore')
    }
}

function remove(urlApi, template, list, self){
    var todoId = self.data('id');

    $.ajax({
        url: urlApi + '/' + todoId,
        method: 'DELETE',
        success: function() {
        printTodos(urlApi, template, list)
        
        },
        error: function() {
            console.log('Si è verificato un errore durante la cancellazione')
        }
    })
}


