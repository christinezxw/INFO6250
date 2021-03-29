# Exam 2 Questions

* Answers should be roughly 2-5 sentences, and in your own words.  
* Some questions ask for a code sample - keep them short and to the point.
* Be sure to be clear - be careful not to use vague pronouns like "it" if I can't be completely sure what "it" is.
* I cannot assume knowledge you don't demonstrate, so be clear and explicit.

## Q1: The first rule I've given about REST services is that the URL should represent a resource.  What does that mean?  Give an example where a url DOES not represent a resource, then describe how to modify it so that it does.
It means that a REST endpoint is often a noun, which identify the thing--resource--to be interacted.
Bad URL example: .../addStudent/
Modify: POST .../student?name=xxx
## Q2: If the service returns the username as a plain text string (not JSON), what is wrong with the below and what would fix it? (Assume the service works without error)
```
  const username = fetch('/username');
  console.log(`user is named ${username}`);
```  
const username = fetch('/username').then(response => response.text());
console.log(`user is named ${username}`);
## Q3: What does it mean to "store your state in the DOM"?  Why shouldn't you do this?
It means to get the current app states from reading the DOM tree data rather than using variables/objects. We shouldn't do this because the screen output belongs to visual part, the way getting data from it might change as the display change.
## Q4: Explain the differences between a multiple-page-web application and single-page-web application.  Be sure to fully demonstrate your understanding.
A multiple-page-web application has several HTML pages. Different URLs lead to different pages load.
A single-page-web application has only one HTML page. Different URLs update the same page with different content with no page load.
## Q5: What is Progressive Enhancement?  What is the difference in an SPA that uses Progressive Enhancement compared to an SPA that doesn't use Progressive Enhancement?
Progressive Enhancement is Taking a non-client-side JS web app and augmenting it with JS. 
An SPA that doesn't use Progressive Enhancement has to have all the logic written in client-side JS. Whereas an SPA that uses Progressive Enhancement can have logic on non-client-side to do some work for it, such as form validation and autocpmplete. 
## Q6: Explain how a REST service is or is not similar to a dynamic asset.
They are similar to each other because they don't exist as a file. A REST service response or a dynamic asset are generated until the client request for it.
They are not similar because a dynamic asset is a file, HTML page, CSS, JS, images or media, used by client-side browser. However a REST service can return HTML fragments, text, JSON, XML, YAML, etc., used by frontend and/or backend. 
## Q7: Give an example of a piece of information you should not store in a cookie, and why you should not store it that way.
We shouldn't store any sensitive information which should remain secure in cookie, such as credit card info, password. Because cookie is just plain text field that anyone can read and write.
## Q8: Explain why it is useful to separate a function that fetches data from what you do with that data
A seperated function that only responsible for fetching data can be reused for different purposes, it doesn't change if the HTML changes. Caller can decide how to react to the fetched data, which has nothing todo with the fetch call function itself. This is seperation of concerns. Also others can review the code more efficiently.
## Q9: Explain why try/catch is useless when dealing with asynchronous errors (assume you aren't using async/await)
Because asynchronous errors always happen after other non-blocking code. The try/catch block cannot catch the error happens in the future. 
## Q10: Is separation of concerns a front end issue, a server-side issue, or both?  Describe an example the demonstrates your answer.
Separation of concerns is both a front end issue and a server-side issue. ALL coding expects SOC, not just JS, not just web dev. 
###Example:
####front-end JS code:
```JS
  function addLogin() {
    document.querySelector('#ranking-app .login button').addEventListener('click', () => {
      const usernameEl = document.querySelector('#ranking-app .login input');
      const username = usernameEl.value;
      performLogin(username)
        .then(() => {
          updateStatus({ status: loginstatus, message: `Hi ${username}, welcome in!` });
          pollingUpdate();
        })
        .catch(err => {
          updateStatus({ status: loginstatus, message: err.error });
        })
    });
  }
```
Function performLogin(), updateStatus(), pollingUpdate() are following SOC.

####back-end JS code:
```JS
  app.post('/session', express.json(), (req, res) => {
      const { username } = req.body;
      const error = sessions.validateUsername(username);
      if (error) {
          res.status(400).json(error);
          return;
      }
      const sid = sessions.createSession(username);
      res.cookie('sid', sid);
      res.status(200).json({});
  });
```
Function validateUsername(), createSession() are following SOC.