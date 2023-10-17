import React from 'react';
import './App.css';
import AddItem from './features/AddItem';
import ListItem from './features/ListItem';
import { useSelector } from 'react-redux';

function App() {
    const items = useSelector((state) => state.items);

    return (
        <div className="App">
            <img src={`${process.env.PUBLIC_URL}/todoify.png`} alt="App Icon" />
            <p>Your ultimate task manager! Stay organized, productive, and never miss a beat with Todoify.
                This powerful task manager and reminder app is your personal assistant for conquering your
                to-do lists. Whether it's daily tasks, important deadlines, or life's little reminders,
                Todoify has you covered. With a sleek and user-friendly interface, it's easy to add, track,
                and complete tasks. Get ready to streamline your life, boost productivity, and achieve more
                with Todoify by your side!
            </p>
            <AddItem />
            <ul>
                {items.map((item) => (
                    <ListItem key={item.id} item={item} />
                ))}
            </ul>
        </div>
    );
}

export default App;
