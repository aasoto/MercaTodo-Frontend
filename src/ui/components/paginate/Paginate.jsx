
export const Paginate = ({links, setPageUrl, setResponse, parameters}) => {
    return (
        <div className="mt-5 flex justify-center items-center gap-2">
            {
                links.map(link => {
                    return (
                        <button 
                            key={link.label}
                            className={ 
                                !link.url
                                    ? "p-3 bg-gray-200 text-gray-600 rounded cursor-not-allowed"
                                    : link.active 
                                        ? "p-3 bg-blue-500 text-white rounded cursor-default" 
                                        : "p-3 bg-gray-300 hover:bg-blue-500 text-gray-900 hover:text-white rounded cursor-pointer"
                            }
                            dangerouslySetInnerHTML={{__html: link.label}}
                            onClick={() => {
                                if (link.url && !link.active) {
                                    setResponse({loading: true});
                                    setPageUrl(`${link.url}${parameters}`);
                                }
                            }}
                        />
                    );
                })
            }
        </div>
    );
}
