# Exam 3 Questions

* Answers should be roughly 2-5 sentences, and in your own words.  
* Some questions ask for a code sample - keep them short and to the point.
* Be sure to be clear - be careful not to use vague pronouns like "it" if I can't be completely sure what "it" is.
* I cannot assume knowledge you don't demonstrate, so be clear and explicit.

* NOTE: Because there is no coding portion to Exam 3, each of these questions is worth more to your grade than the questions on previous Exams!  Be sure to have answers you are confident shows your understanding!

## Q1: I have said that React JSX components are like functions and follow many of the same best practices.  Give at least 2 such best practices that are good for both JS functions and JSX Components.  (Give details!)

## Q2: I have said that using Progressive Enhancement (supporting both MPA and SPA) is best, but many places don't do so because of the effort involved.  What is at least one major reason not to use SPA alone?

## Q3: The "proxy" setting in your package.json is required for the create-react-app dev server to call a local service, but not if you are calling a service that will always be on a different domain.  Explain what happens (in terms of network traffic) when your dev server is running on localhost port 3000 and the page makes a call to `/service` when you have "proxy" set to `http://localhost:4000` and a server running on localhost port 4000 that has the `/service` service.  hint: This should list and describe multiple request/response steps, and be clear where each request is coming from and where the response is received.

## Q4: Follow-up: Using the above scenario, list and describe what the network calls are like after you run `npm run build` and are only running all of your content on localhost port 4000 when your JSX makes a call to `/service`

## Q5: I have said that you can only pass data "down" in React, not "up".  What does that mean?  Give simple code sample if that makes it easier to describe.

## Q6: Follow-up: If you can't pass data "up" the component tree, how can anything that is "down" change data that is in an ancestor?  Give simple code samples if that makes it easier to describe.

## Q7: Imagine you have a collection of student records, with each having a student id, a name, and an address. (an example of one item in the collection would be: { id: "654321", name: "Bao", address: "123 Main Street" })  Imagine you also have collection of steps to create a pizza, with each step having an ingredient, a quantity, and an instruction. (an example of one item in the collection would be the object { qty: "1 cup", ingredient: "shredded cheese", instructions: "sprinkle over pizza" })

Give a code sample where each collection is shown with at least one more element (2+ students for the first collection, 2+ pizza-making steps).  Make sure you make proper use of arrays and objects.  Explain why you've chosen each way of making a collection (e.g. Why you use an array for one or both, or why you use an object for one or both)

## Q8: How does inheritance in JS relate to a prototype?  Give a simple code sample if it helps explain.

## Q9: What is wrong about this code sample? `if( !username || username == undefined) { ` Be sure to explain why that is wrong.

## Q10: In your own words, what is decoupling?  What is an example of decoupling in a React app?  Why is this beneficial?

## Q11: In React you should not read/write from/to the DOM directly.  If you wanted a button that changed the background color of an element between two choices, how would you change that color without modifying the style attribute of the element?  Be sure to describe how you make this happen using React.

## Q12: Imagine you have a React application with an input field and a button.  When you click the button, it should call a service you have written and pass the value from the input field, and display a string returned in the service JSON on the page.  Also imagine that it is not working.  Describe at least two ways you could figure out if the problem is in the service code or if the problem is in the React code.  Hint: This question is about debugging, not coding

## Q13: How many times would the below code render (if there are no changes from outside this code), and what is the rendered output for each of those times, and what triggered (caused) the render?  Assume something DOES cause this to be rendered at least once.
```
import { useState } from 'react';

function Demo() { 
  const [count, setCount] = useState(0);
  setCount(1);
  return (
    <div>{count}</div>
  );
}
```

## Q14: What happens with the below code when rendered and why?
```
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

## Q15: What is the difference between `WHATEVER.json(...)` in browser-side code and server-side code?  (assume variables are named according to our normal practice)

## Q16: In our projects we had our services on the same server as our HTML/JS/CSS.  What would be different about the urls in our browser-side fetch code if our services were on a different server? (in production, not in development)

## Q17: In our projects we had our services on the same server as our HTML/JS/CSS.  What would be different about the responses from our server-side code if our services were on a different server? (in production, not in development)

## Q18: If a browser navigates to `http://localhost:3000/page/start` on an express server set up in our conventional way with the below routes, list the web request(s)/response(s) involved, and what the user will see.  (Hint: If you are uncertain, you can set up and try this code!)

```
app.get('/page/start', (req, res) => { 
  res.redirect('/page/end');
});

app.get('/page/end', (req, res) => { 
  res.send('Hello World');
});
```
## Q19: The web is stateless.  When we log in to websites, we have an experience that looks stateful (We do not have to log in to every page).  Assuming cookie-based sessions, how does this work?

## Q20: I have said that "working code is the start of programming, not the end".  If "working" isn't what defines good code, what does?



