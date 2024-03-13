export default function Permission({ t, text }) {
  return (
    <div className="grid grid-cols-6 gap-x-3 items-center">
      <h1
        className="col-span-2 pr-2 bg-gradient-to-l 
                 from-orange-300 to-orange-100 
                 dark:text-gray-800 dark:font-medium
                rounded-lg font-medium py-1">
        {t(text)}
      </h1>
      <input type="checkbox" className={"h-5"} name="add" value={t} />
      <input type="checkbox" className={"h-5"} name="edit" />
      <input type="checkbox" className={"h-5"} name="remove" />
      <input type="checkbox" className={"h-5"} name="ban" />
    </div>
  );
}
