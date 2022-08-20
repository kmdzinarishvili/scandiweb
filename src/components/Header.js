import '../styles/header.css'

const Header = ({ pageName, funct1, funct2 }) => {


    return <div className='header'>
        <h2 className='title'>Project {pageName}</h2>
        <span className='buttons'>
            <button onClick={funct1}>{"button1"}</button>
            <button onClick={funct2}>{"button2"} </button>
        </span>
    </div>
}

export default Header;