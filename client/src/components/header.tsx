import { FC, ReactElement } from "react";
export const Header: FC<{title: string;}> = (props): ReactElement => {
    const { title } = props;
    return (
        <header className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg border-b border-gray-700">
            <div className="max-w-7xl mx-auto py-4 px-6 lg:px-8">
                <h1 className="text-2xl font-semibold text-gray-100">
                    {title}
                </h1>
            </div>
        </header>
    );
};
