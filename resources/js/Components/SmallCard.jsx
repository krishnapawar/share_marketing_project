const SmallCard = ({ title, value, icon, bgColor, textColor }) => {
    return (
        <div className={`m-5 w-full sm:w-1/2 md:w-1/3 lg:w-1/5`}>
            <div className={`rounded-lg shadow-lg p-6 ${bgColor} ${textColor} flex items-center`}>
                <div className="flex-shrink-0">
                    <i className={`fas ${icon} fa-2x`}></i>
                </div>
                <div className="ml-4">
                    <div className="text-lg font-semibold">{title}</div>
                    <div className="text-2xl">{value}</div>
                </div>
            </div>
        </div>
    );
};

export default SmallCard;