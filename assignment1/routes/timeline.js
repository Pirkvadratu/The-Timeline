const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const data = [
    { name: "Michael Choi", createdAt: "23-01-2013", message: "This is my message This is my message This is my message This is my message This is my message" },
    { name: "Michael Choi", createdAt: "15-01-2013", message: "This is my message This is my message This is my message This is my message This is my message" },
    { name: "Cory Whiteland", createdAt: "15-01-2013", message: "This is my message This is my message This is my message This is my message This is my message" },
    { name: "Cory Whiteland", createdAt: "01-01-2013", message: "This is my message This is my message This is my message This is my message This is my message" }
];

function sortByDate(data) {
    return data.sort((a, b) => {
        const dateA = new Date(a.createdAt.split('-').reverse().join('-'));
        const dateB = new Date(b.createdAt.split('-').reverse().join('-'));
        return dateB - dateA;
    });
}

router.get('/', (req, res) => {
    const sortedData = sortByDate([...data]);
    let html = fs.readFileSync(path.join(__dirname, '../views/index.html'), 'utf8');
    
    // Generate posts HTML
    let postsHTML = '';
    sortedData.forEach(post => {
        postsHTML += `
            <div class="post">
                <div class="name">${post.name}</div>
                <div class="date">${post.createdAt}</div>
                <div class="message">${post.message}</div>
            </div>
        `;
    });
    
    // Insert posts before closing body tag
    html = html.replace('</body>', postsHTML + '</body>');
    
    res.send(html);
});

module.exports = router;