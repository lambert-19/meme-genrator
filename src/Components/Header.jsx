import { Link } from "react-router-dom"

const Header = () => {
  return (
    <div>
        <header style={{backgroundColor:'#333',color:'#fff',padding:'10px',textAlign:'center'}}>
            <nav>
                <Link to="/" style={{marginRight:'15px',color:'#fff',textDecoration:'none'}}>Creer un Meme</Link>
                <Link to="/gallery" style={{color:'#fff',textDecoration:'none'}}>Galerie de Memes</Link>
            </nav>
        </header>
    </div>
  )
}

export default Header