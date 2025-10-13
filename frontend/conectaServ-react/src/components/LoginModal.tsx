export default function LoginModal() {
  return (
    <>
      <div id="loginModal" className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg w-full max-w-md mx-4">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-800">Iniciar sesión</h3>
              <button id="closeLoginModal" className="text-gray-500 hover:text-gray-700">
                <i className="fas fa-times"></i>
              </button>
            </div>

            <form id="loginForm">
              <div className="mb-4">
                <label htmlFor="loginEmail" className="block text-sm font-medium text-gray-700 mb-1">
                  Correo electrónico*
                </label>
                <input type="email" id="loginEmail" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" required />
              </div>

              <div className="mb-6">
                <label htmlFor="loginPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  Contraseña*
                </label>
                <input type="password" id="loginPassword" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" required />
                <div className="flex justify-end mt-1">
                  <a href="#" className="text-sm text-blue-500 hover:text-blue-700">
                    ¿Olvidaste tu contraseña?
                  </a>
                </div>
              </div>

              <div className="mb-6">
                <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 rounded-lg font-medium transition">
                  Iniciar sesión
                </button>
              </div>

              <div className="text-center text-sm text-gray-600">
                ¿No tienes una cuenta?{' '}
                <button id="switchToRegister" className="text-blue-500 hover:text-blue-700 font-medium">
                  Regístrate
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
