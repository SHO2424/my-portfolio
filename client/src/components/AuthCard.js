const AuthCard = ({ children }) => (
    <div
        className="min-h-screen sm:flex  sm:justify-evenly items-center pt-6 sm:pt-0"
        style={{ background: 'rgb(204,204,204)' }}>
        {/* <div>{logo}</div> */}

        {/* <div className="w-full  sm:max-w-md mt-6 px-6 py-4 bg-gray-100 shadow-md overflow-hidden sm:rounded-lg"> */}
        {children}
        {/* </div> */}
    </div>
);

export default AuthCard;
