import React from 'react'

function Footer() {
  return (
    
        <footer className="bg-gray-800 text-white py-8 mt-auto">
          <div className="container mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              
              {/* Logo y descripción */}
              <div>
                <h2 className="text-xl font-bold">Mi Sitio</h2>
                <p className="text-gray-400 mt-2">
                  Un lugar donde la música cobra vida.
                </p>
              </div>
    
              {/* Links de navegación */}
              <div>
                <h3 className="text-lg font-semibold">Enlaces</h3>
                <ul className="mt-2 space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-white">Inicio</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white">Explorar</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white">Contacto</a></li>
                </ul>
              </div>
    
              {/* Redes sociales */}
              <div>
                <h3 className="text-lg font-semibold">Síguenos</h3>
                <div className="flex space-x-4 mt-2">
                  <a href="#" className="text-gray-400 hover:text-white">
                    <i className="fab fa-facebook"></i>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-white">
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-white">
                    <i className="fab fa-instagram"></i>
                  </a>
                </div>
              </div>
    
            </div>
    
            {/* Línea divisoria y derechos reservados */}
            <div className="border-t border-gray-700 mt-6 pt-4 text-center text-gray-500">
              © {new Date().getFullYear()} Mi Sitio. Todos los derechos reservados.
            </div>
          </div>
        </footer>
  )
}

export default Footer
