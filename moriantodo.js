
Todos = new Meteor.Collection("todos");

if (Meteor.isClient) {
  
  Meteor.startup(function () {    
    
    if (Todos.find({pathname:location.pathname}).count() === 0) {
      //Todos.insert({pathname:location.pathname, done: false, name:"ABC"});
    }
  });

  Template.hello.greeting = function () {
    return "Welcome to moriantodo.";
  };
  
  Template.hello.pathname = function () {
    return location.pathname.substring(1);
  };
  
  Template.hello.todos = function () {
    return Todos.find({pathname:location.pathname});
  };
  
  
  Template.todo.markdone =  function() {
    return this.done ? "done" : "notdone";
  }
  
  Template.todo.done_checkbox = function () {
    return this.done ? 'checked="checked"' : '';
  };

  Template.hello.events({
    'click #addtodo' : function () {
      Todos.insert({pathname:location.pathname, done: false, doneHtml:"", 
                    name:$("#newtodo").val()});
    }
  });
  
  Template.todo.events({
    'click span.done' : function () {
       Todos.update(this._id, {$set: {done: !this.done}});
    },
    'click span.delete' : function () {
       Todos.remove(this._id);
    },
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    //Todos.remove({});
  });
}
