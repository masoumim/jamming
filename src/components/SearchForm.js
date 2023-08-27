// SearchForm.js - This component contains the search form which includes text input field and submit button

function SearchForm({handleSearchSubmit, searchBarInput, handleSearchBarInput }) {
    return (
        <div className="searchForm">
            <form className="search" onSubmit={handleSearchSubmit}>
                <input required id="searchBar" name="searchBar" type="text" className="searchBarInput" input={searchBarInput} onChange={handleSearchBarInput}></input>
                <button type="submit">Find Track</button>
            </form>
        </div>
    );
}

export default SearchForm;