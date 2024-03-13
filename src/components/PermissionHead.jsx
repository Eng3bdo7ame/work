// eslint-disable-next-line react/prop-types
export default function PermissionHead({ t, text }) {
  return (
    <div className="grid grid-cols-6 text-center gap-x-3">
      <h1
        className={`bg-gradient-to-b from-orange-500 rounded-lg 
          font-medium p-1 pr-2 col-span-2 text-right`}
      >
        {t(text)}
      </h1>
      <p className="bg-gradient-to-b from-orange-500 rounded-lg font-medium py-1">
        {t("rolesForm.permission.add")}
      </p>
      <p className="bg-gradient-to-b from-orange-500 rounded-lg font-medium py-1">
        {t("rolesForm.permission.edit")}
      </p>
      <p className="bg-gradient-to-b from-orange-500 rounded-lg font-medium py-1">
        {t("rolesForm.permission.delete")}
      </p>
      <p className="bg-gradient-to-b from-orange-500 rounded-lg font-medium py-1">
        {t("rolesForm.permission.ban")}
      </p>
    </div>
  );
}
