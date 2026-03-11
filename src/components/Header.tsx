import React from 'react';
export default function Header() {
  

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <a className="navbar-brand" href="/">Navbar scroll</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarScroll">
      <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll" style={{ ["--bs-scroll-height" as string]: "100px" }}>
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="/">Home</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/">Link</a>
        </li>
        <li className="nav-item dropdown">
          <button type="button" className="nav-link dropdown-toggle border-0 bg-transparent" data-bs-toggle="dropdown" aria-expanded="false">
            Link
          </button>
          <ul className="dropdown-menu">
            <li><button type="button" className="dropdown-item">Action</button></li>
            <li><button type="button" className="dropdown-item">Another action</button></li>
            <li><hr className="dropdown-divider"></hr></li>
            <li><button type="button" className="dropdown-item">Something else here</button></li>
          </ul>
        </li>
        <li className="nav-item">
          <span className="nav-link disabled" aria-disabled="true">Link</span>
        </li>
      </ul>
      <form className="d-flex" role="search">
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
        <button className="btn btn-outline-success" type="submit">Search</button>
      </form>
    </div>
  </div>
</nav>
  );
}