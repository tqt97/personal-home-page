export default function AppLogo() {
    return (
        <>
            <div className="flex aspect-square size-8 items-center justify-center rounded-md bg-blue-700">
                <span className="text-xl font-bold text-white">T</span>
            </div>
            <div className="ml-1 grid flex-1 text-left text-sm">
                <span className="mb-0.5 truncate leading-none font-semibold text-blue-700 dark:text-blue-500">Laravel Blog</span>
            </div>
        </>
    );
}
