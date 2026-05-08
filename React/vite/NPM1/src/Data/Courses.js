const courses = [
  {
    id: 1,
    title: "React Basics",
    instructor: "Pavan Ghadge",
    duration: "6 hours",
    description: "Learn React fundamentals",
    lessons: [
      {
        id: 1,
        title: "Introduction to React",
        duration: "10 min",
        content: `
React is a JavaScript library used for building user interfaces, especially single-page applications.
It allows developers to create reusable UI components and manage application state efficiently.

Key Features:
- Component-based architecture
- Virtual DOM for performance optimization
- One-way data binding

React is maintained by Meta and widely used in modern web development.
        `,
      },
      {
        id: 2,
        title: "JSX Deep Dive",
        duration: "15 min",
        content: `
JSX stands for JavaScript XML. It allows you to write HTML-like syntax inside JavaScript.

Example:
const element = <h1>Hello World</h1>;

JSX is not required but makes code easier to understand and write.

Rules:
- Must return a single parent element
- Use className instead of class
- JavaScript expressions are written inside {}

JSX is compiled into React.createElement() calls.
        `,
      },
      {
        id: 3,
        title: "Components",
        duration: "20 min",
        content: `
Components are the building blocks of React applications.

Types:
1. Functional Components (modern)
2. Class Components (older approach)

Example:
function Header() {
  return <h1>Welcome</h1>;
}

Components help in:
- Code reusability
- Better structure
- Easy maintenance
        `,
      },
      {
        id: 4,
        title: "Props and State",
        duration: "25 min",
        content: `
Props (properties):
- Used to pass data from parent to child components
- Read-only

State:
- Used to manage dynamic data inside a component
- Can be updated using useState()

Example:
const [count, setCount] = useState(0);

Props = external data
State = internal data
        `,
      },
    ],
  },

  {
    id: 2,
    title: "JavaScript Advanced",
    instructor: "Prashant Gorde",
    duration: "8 hours",
    description: "Deep dive into JavaScript",
    lessons: [
      {
        id: 1,
        title: "Closures Explained",
        duration: "15 min",
        content: `
A closure is a function that has access to its outer function’s variables even after the outer function has executed.

Example:
function outer() {
  let count = 0;
  return function inner() {
    count++;
    console.log(count);
  };
}

Closures are useful for:
- Data privacy
- Function factories
- Maintaining state
        `,
      },
      {
        id: 2,
        title: "Promises",
        duration: "20 min",
        content: `
Promises are used to handle asynchronous operations in JavaScript.

States:
- Pending
- Resolved
- Rejected

Example:
fetch(url)
  .then(res => res.json())
  .catch(err => console.log(err));

They help avoid callback hell and improve readability.
        `,
      },
      {
        id: 3,
        title: "Async/Await",
        duration: "25 min",
        content: `
Async/Await is syntactic sugar over promises.

Example:
async function fetchData() {
  const res = await fetch(url);
  const data = await res.json();
}

Benefits:
- Cleaner code
- Easier error handling using try-catch
        `,
      },
    ],
  },
];

export default courses;
