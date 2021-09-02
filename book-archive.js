// declaring the onclick function 
const searchBook = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    searchField.value = ' ';
    const url = `https://openlibrary.org/search.json?q=${searchText}`;
    fetch(url)
        .then(response => response.json())
        .then(data => displaySearchResult(data.docs))
}

// result function for display the result
const displaySearchResult = books => {
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';
    // checking and comparing the length of the result array.
    if (books.length === 0) {
        const totalBooks = document.getElementById('total-books');
        totalBooks.textContent = '';
        const div = document.createElement('div');
        div.innerHTML = `
            <h3 class="text-center text-warning">Sorry! No Books Found</h3>
        `;
        totalBooks.appendChild(div);
    }
    else {
        const totalBooks = document.getElementById('total-books');
        totalBooks.textContent = '';
        const div = document.createElement('div');
        div.innerHTML = `
            <h3 class="text-center text-success">Total ${books.length} Books Found</h3>
        `;
        totalBooks.appendChild(div);
    }

    // using forEach to get and display data from each book
    books.forEach(book => {
        const imageUrl = `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`;
        const div = document.createElement('div');
        div.style.border = "thin solid lightgray";

        div.classList.add('col');
        div.innerHTML = `
        <img src="${imageUrl}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${book.title}</h5>
            <h6 class="card-title">Author: ${book.author_name}</h6>
            <h6 class="card-title">Publisher: ${book.publisher}</h6>
            <p class="card-text"><small class="text-muted">First Published: ${book.first_publish_year}</small></p>
        </div>
        `;

        searchResult.appendChild(div);
    })
}