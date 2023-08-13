
export const Unverified = () => {
    return (
        <div className="flex flex-col justify-center items-center gap-5 h-screen">
            <div className="w-4/5 sm:w-3/5 lg:w-2/5 bg-white rounded-lg px-10 py-6 shadow-lg">
                <div className="flex flex-col justify-center items-center gap-4">
                    <h3 className="text-gray-900 text-xl font-semibold text-center">
                        Correo electronico sin verificar
                    </h3>
                    <p className="text-sm">
                        Por favor vaya a su correo electronico y verifique su cuenta.
                    </p>
                </div>
            </div>
        </div>
    );
}
