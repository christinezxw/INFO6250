# Exam 3 Questions

* Answers should be roughly 2-5 sentences, and in your own words.  
* Some questions ask for a code sample - keep them short and to the point.
* Be sure to be clear - be careful not to use vague pronouns like "it" if I can't be completely sure what "it" is.
* I cannot assume knowledge you don't demonstrate, so be clear and explicit.

* NOTE: Because there is no coding portion to Exam 3, each of these questions is worth more to your grade than the questions on previous Exams!  Be sure to have answers you are confident shows your understanding!

## Q1: I have said that React JSX components are like functions and follow many of the same best practices.  Give at least 2 such best practices that are good for both JS functions and JSX Components.  (Give details!)
1. name function/component properly and meaningly. For example, don't name 'a' or 'bold', instead, name them like 'student', 'list'. 
2. seperate of concerns. Don't write huge functions and components. Pull out logic into more function or component. 
3. functions/components should be reusable.

## Q2: I have said that using Progressive Enhancement (supporting both MPA and SPA) is best, but many places don't do so because of the effort involved.  What is at least one major reason not to use SPA alone?
Client side must enable Javascript to run SPA. If developers use SPA alone without PE, the client cannot get all content if their browser disables JS. But if there's PE, even JS is disabled, client still can get some content from the service developers have made through PE.

## Q3: The "proxy" setting in your package.json is required for the create-react-app dev server to call a local service, but not if you are calling a service that will always be on a different domain.  Explain what happens (in terms of network traffic) when your dev server is running on localhost port 3000 and the page makes a call to `/service` when you have "proxy" set to `http://localhost:4000` and a server running on localhost port 4000 that has the `/service` service.  hint: This should list and describe multiple request/response steps, and be clear where each request is coming from and where the response is received.
1. browser request 'http://localhost:3000/service', no static asset
2. dev-server sends request to actual server on port 4000 accorsing to the proxy
3. dev-server gets response from 'http://localhost:4000/service'
4. dev-server sends response to browser

## Q4: Follow-up: Using the above scenario, list and describe what the network calls are like after you run `npm run build` and are only running all of your content on localhost port 4000 when your JSX makes a call to `/service`
1. browser request 'http://localhost:4000/service', find static asset
2. browser gets response

## Q5: I have said that you can only pass data "down" in React, not "up".  What does that mean?  Give simple code sample if that makes it easier to describe.
It means that component accepts 'prop' as data from its parent component and 'prop' is read-only for it. When the parent component passes data as 'prop' to its child component, child component can only read the data but cannot modify the data so that the parent component be aware of the change. 
``` JS
	const Parent = function(){
		const message = "Haha";
		return (
			<Child message = {message}/>
		)
	};

	const Child = function({message}){
		return (
			<p>Show message: {message}</p>
		);
	};
```

## Q6: Follow-up: If you can't pass data "up" the component tree, how can anything that is "down" change data that is in an ancestor?  Give simple code samples if that makes it easier to describe.
Parent component should pass callback function to child component which is able to change its data. Child component will call the callback function when it wants to change certain data.
``` JS
	const Parent = function(){
		const [message,setMessage] = useState("Haha");
		return (
			<Child message = {message} setMessage = {setMessage}/>
		)
	};

	const Child = function({message, setMessage}){
    const newMessage = "Lala";
		return (
			<p>message: {message}</p>
      <button onClick={setMessage(newMessage)}>Change message</button>
		);
	};
```

## Q7: Imagine you have a collection of student records, with each having a student id, a name, and an address. (an example of one item in the collection would be: { id: "654321", name: "Bao", address: "123 Main Street" })  Imagine you also have collection of steps to create a pizza, with each step having an ingredient, a quantity, and an instruction. (an example of one item in the collection would be the object { qty: "1 cup", ingredient: "shredded cheese", instructions: "sprinkle over pizza" })

Give a code sample where each collection is shown with at least one more element (2+ students for the first collection, 2+ pizza-making steps).  Make sure you make proper use of arrays and objects.  Explain why you've chosen each way of making a collection (e.g. Why you use an array for one or both, or why you use an object for one or both)
```JS
const students = {
  "654321": {
    id: "654321", 
    name: "Bao", 
    address: "123 Main Street"
  },
  "123456": {
    id: "123456", 
    name: "Aha", 
    address: "456 Blvd"
  }
}
```
I choose use object for 'students' because each student has an unique id, no order.

```JS
const steps = {
  {
    qty: "1 cup", 
    ingredient: "shredded cheese", 
    instructions: "sprinkle over pizza"
  },
  {
    qty: "several pieces", 
    ingredient: "basil", 
    instructions: "put on the center of pizza"
  }
}
```
I choose use array for 'steps' because there's no unique, and there's an order of the steps.

## Q8: How does inheritance in JS relate to a prototype?  Give a simple code sample if it helps explain.
Inheritance in JS is actually prototype chain. If the code tries to access a value on the object, and the object doesn't have it defined for itself, it will check to see if its prototype has it. Because the prototype is an object, when asked for this value, if it doesn't have it, it will check to see if its prototype has it. This continues until an object doesn't have a prototype and this chain is called prototype chain.
``` JS
var PrototypeDemo = function () {
    this.value = 1;
    this.getValueA = function() {
        return this.value;
    }
}

PrototypeDemo.prototype = {
    getValueB: function() {
        return this.value;
    }
}

var objA = new PrototypeDemo();

objA.getValueA() // 1
objA.getValueB() // 1
```

## Q9: What is wrong about this code sample? `if( !username || username == undefined) { ` Be sure to explain why that is wrong.
1. ```!username``` includes the situation where username is undefined
2. we shouls always use strict comparision ```username === undefined```

## Q10: In your own words, what is decoupling?  What is an example of decoupling in a React app?  Why is this beneficial?
Decoupling is to seperate a child component from a big parent component. 

Example:
``` JS
import Box from './Box';
import Cat from './Cat';
const Room = () => {
  return (
    <div className="room">
      <Box><Cat name="Maru"/></Box>
      <Box><Cat name="Grumpy"/></Box>
    </div>
  );
};
----------------------------------------------------------
export default Room;
const Box = ({ children }) => {
const contents = children ? children : <div>Nothing</div>;
return ( <div> A box contains: {contents} </div>);
};
----------------------------------------------------------
export default Box;
const Cat = ({ name }) => (<div>{name}</div>);
export default Cat;
```

Beneficial:
1. make code easy to read and maintain
2. make components reusable
3. follow SOC

## Q11: In React you should not read/write from/to the DOM directly.  If you wanted a button that changed the background color of an element between two choices, how would you change that color without modifying the style attribute of the element?  Be sure to describe how you make this happen using React.
1. have a state 'isActive' demonstrate which className is active
2. add a onClick event on the button, which will flip the active state each time, true to false or false to true
3. active the className of the component whose background color is going to be changed according to the state, for example if 'isActive' is true assign 'classA' to className otherwise assign 'classB' to className
4. have CSS styles for 'classA' and 'classB'

## Q12: Imagine you have a React application with an input field and a button.  When you click the button, it should call a service you have written and pass the value from the input field, and display a string returned in the service JSON on the page.  Also imagine that it is not working.  Describe at least two ways you could figure out if the problem is in the service code or if the problem is in the React code.  Hint: This question is about debugging, not coding
1. Check back-end code: I'll check what the service code get from front-end and what it returns. If what it gets is not the same as the string in the input field, there must be problems on catching input field data. If it gets the correct input but what it returns is different than expect, then the problem is the service logic. If the input the return are both correct, then the problem exist in the front-end displaying the returned string.
2. Check React code: I'll check if all the setState functions are real working. First is the setInputState, whether the string in the input field is set to inputState. Second is the setResultState, whether the string returned from service is set to resultState. If all the setState functions are working as expected, then the problem might happend in the service code.

## Q13: How many times would the below code render (if there are no changes from outside this code), and what is the rendered output for each of those times, and what triggered (caused) the render?  Assume something DOES cause this to be rendered at least once.
``` JS
import { useState } from 'react';
function Demo() {
  const [count, setCount] = useState(0);
  if (!count) {
    setCount(1);
  }
  return (
    <div>{count}</div>
  );
}
```
The code renders twice. The first render happens when count is initialized with value 0 and the second render happens when `count === 0` so `!count === true` and then count is set to value 1.

## Q14: What happens with the below code when rendered and why?
``` JS
import { useState, useEffect } from 'react';

function Demo() { 
  const [count, setCount] = useState(0);
  
  useEffect( () => { 
    Promise.resolve().then( () => { 
      setCount(count + 1);
    });
  }, [count]);
  return (
    <div>{count}</div>
  );
}
```
The state 'count' is set to 0 initially. 'useEffect' will run the function:
``` JS
Promise.resolve().then( () => { 
      setCount(count + 1);
    });
```
to increase 'count' by 1 everytime 'count' changes. This means there's an inifinite loop of increasing 'count' by 1.

## Q15: What is the difference between `WHATEVER.json(...)` in browser-side code and server-side code?  (assume variables are named according to our normal practice)
`WHATEVER.json(...)` in browser-side code returns a promise from fetch result, and resolves it as JSON data.
Example:
``` JS
export const performLogout = function () {
  return fetch('/session', {
    method: 'DELETE',
  })
    .catch(() => {
      return Promise.reject({ error: 'network-error' });
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      return response.json().then(err => Promise.reject(err));
    });
};
```
`WHATEVER.json(...)` in server-side code interpretes the data from request into JSON data and put JSON data into response object.
Example:
```JS
app.get('/ranking', express.json(), (req, res) => {
    const sid = req.cookies.sid;
    if (!sid) {
        res.status(401).json({ error: 'login-required' });
        return;
    } else if (!sessions.isValidSession(sid)) {
        res.status(403).json({ error: 'login-invalid' });
    }
    const { username } = sessions.sessionData[sid];
    res.status(200).json(sessions.userData[username]);
});
```

## Q16: In our projects we had our services on the same server as our HTML/JS/CSS.  What would be different about the urls in our browser-side fetch code if our services were on a different server? (in production, not in development)
URLs in our browser-side fetch code would be the absolute path of that service. For example, if front-end and back-end have the same origin, we can just fetch "/sample", but if the service is on another origin, let's say "http://hahaha/sample", then we should fetch "http://hahaha/sample"

## Q17: In our projects we had our services on the same server as our HTML/JS/CSS.  What would be different about the responses from our server-side code if our services were on a different server? (in production, not in development)
If front-end and back-end have the same origin, nothing special on the response, but if the service is on another origin, server-side code should send CORS header in the response, to let the browser know that this request is allowed. If no CORS header set up, then the fetch will fail, forbidened by the browser.

## Q18: If a browser navigates to `http://localhost:3000/page/start` on an express server set up in our conventional way with the below routes, list the web request(s)/response(s) involved, and what the user will see.  (Hint: If you are uncertain, you can set up and try this code!)

``` JS
app.get('/page/start', (req, res) => { 
  res.redirect('/page/end');
});

app.get('/page/end', (req, res) => { 
  res.send('Hello World');
});
```

request: 
Request URL: http://localhost:3000/page/start
Request Method: GET

response:
Status Code: 302 Found

request:
Request URL: http://localhost:3000/page/end
Request Method: GET

response:
Status Code: 200 OK

## Q19: The web is stateless.  When we log in to websites, we have an experience that looks stateful (We do not have to log in to every page).  Assuming cookie-based sessions, how does this work?
When we login, the server will generate an session id for our connection, and put this session id into response cookie. Each request we make after this will carry the session id in cookie to the server as long as we still login and session is not expired. Server side will have something like a database to store our session info, may be use session id as key, and all user info and behaviors as value. So when the server receives the request with session id in cookie, it will know who we are, what we've done in the website, which makes it look stateful. 

## Q20: I have said that "working code is the start of programming, not the end".  If "working" isn't what defines good code, what does?
Good code should be reusable, easy to read and maintain and follow SOC. 


