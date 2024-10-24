import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RepoDetails = ({ owner, repo }) => {
    const [repoDetails, setRepoDetails] = useState(null);

    useEffect(() => {
        const fetchRepoDetails = async () => {
            const result = await axios.get(`https://api.github.com/repos/${owner}/${repo}`);
            setRepoDetails(result.data);
        };

        fetchRepoDetails();
    }, [owner, repo]);

    if (!repoDetails) return <div>Loading...</div>;

    return (
        <div>
            <h2>{repoDetails.full_name}</h2>
            <p>{repoDetails.description}</p>
            <p>🌟 Stars: {repoDetails.stargazers_count}</p>
            <p>🍴 Forks: {repoDetails.forks_count}</p>
            <p>🐛 Open Issues: {repoDetails.open_issues_count}</p>
            <p><a href={repoDetails.html_url} target="_blank" rel="noopener noreferrer">View on GitHub</a></p>
        </div>
    );
};

export default RepoDetails;
