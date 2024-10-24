import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserProfile = ({ username }) => {
    const [user, setUser] = useState(null);
    const [repos, setRepos] = useState([]);

    useEffect(() => {
        const fetchUser = async () => {
            const userInfo = await axios.get(`https://api.github.com/users/${username}`);
            setUser(userInfo.data);
        };

        const fetchUserRepos = async () => {
            const userRepos = await axios.get(`https://api.github.com/users/${username}/repos`);
            setRepos(userRepos.data);
        };

        fetchUser();
        fetchUserRepos();
    }, [username]);

    if (!user) return <div>Loading...</div>;

    return (
        <div>
            <h2>{user.name} (@{user.login})</h2>
            <img src={user.avatar_url} alt={user.login} width="100" />
            <p>Followers: {user.followers} | Following: {user.following}</p>
            <p><a href={user.html_url} target="_blank" rel="noopener noreferrer">View on GitHub</a></p>

            <h3>Repositories:</h3>
            <ul>
                {repos.map(repo => (
                    <li key={repo.id}>
                        <a href={repo.html_url} target="_blank" rel="noopener noreferrer">{repo.name}</a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserProfile;
