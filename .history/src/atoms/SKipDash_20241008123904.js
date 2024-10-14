import React from 'react';
import './FacebookDashboard.css';
import profileImg from './assets/.jpg'; // Replace with your local image
import postImg from './assets/post.jpg'; // Replace with your local image

function FacebookDashboard() {
    return (
        <div className="facebook-dashboard">
            {/* Header */}
            <div className="header">
                <div className="header-left">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg" alt="Facebook Logo" className="logo" />
                    <input type="text" placeholder="Search Facebook" />
                </div>
                <div className="header-center">
                    {/* Replace with icons or images as needed */}
                    <img src={profileImg} alt="Profile" />
                </div>
                <div className="header-right">
                    {/* Replace with other icons or elements */}
                    <img src={profileImg} alt="User" />
                </div>
            </div>

            {/* Main Layout */}
            <div className="facebook-dashboard">
                {/* Left Sidebar */}
                <div className="left-sidebar">
                    <ul>
                        <li><img src={profileImg} alt="Profile" /> Muneza Dixon</li>
                        <li><img src={profileImg} alt="Friends" /> Friends</li>
                        <li><img src={profileImg} alt="Memories" /> Memories</li>
                        <li><img src={profileImg} alt="Groups" /> Groups</li>
                        <li><img src={profileImg} alt="Marketplace" /> Marketplace</li>
                    </ul>
                </div>

                {/* Main Content */}
                <div className="main-content">
                    {/* Stories */}
                    <div className="stories">
                        <div className="story">
                            <img src={profileImg} alt="Story" />
                            <span>Create Story</span>
                        </div>
                        {/* Add more stories as needed */}
                    </div>

                    {/* Posts */}
                    <div className="post">
                        <h3>Kitiibwa Myst Baker</h3>
                        <span>October 4 at 12:31 PM</span>
                        <p>Home treat feels like wow 😲</p>
                        <img src={postImg} alt="Post" />
                    </div>
                    {/* Add more posts as needed */}
                </div>

                {/* Right Sidebar */}
                <div className="right-sidebar">
                    <ul>
                        <li><img src={profileImg} alt="Friend Request" /> Sarah Andersson</li>
                        <li><img src={profileImg} alt="Birthdays" /> Birthdays</li>
                        <li><img src={profileImg} alt="Contacts" /> Contacts</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default FacebookDashboard;
