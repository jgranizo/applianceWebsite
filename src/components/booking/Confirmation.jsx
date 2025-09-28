import { Link } from "react-router-dom";
const money = n =>
  typeof n === "number"
    ? n.toLocaleString(undefined, { style: "currency", currency: "USD" })
    : "";

export default function Confirmation({ data }) {
  const { contact, appointment, appliances = [], brandIssue = [] } = data;
  const total = appliances.reduce((sum, a) => sum + (+a.price || 0), 0);

  return (
    <div className="w-full max-w-2xl mx-auto px-4 mt-10 text-center ">

      <div className="w-full max-w-2xl space-y-6 text-center">
        <h2 className="text-2xl font-bold text-green-600">✅ Booking Complete!</h2>

        <div className="space-y-6">
          <div>
            <h3 className="font-semibold text-gray-800">Appointment</h3>
            <p>
              {appointment.date
                ? new Date(appointment.date + "T00:00:00").toLocaleDateString()
                : "—"}{" "}
              {appointment.time ? `at ${appointment.time}` : ""}
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-800">Appliances</h3>
            <ul className="list-none space-y-1">
              {appliances.map((a, i) => (
                <li key={a.id ?? `${a.name}-${i}`}>
                  <span className="font-medium">{a.name}</span>
                  {a.price != null && <> — {money(a.price)}</>}
                </li>
              ))}
            </ul>
            {appliances.length > 0 && (
              <p className="mt-1 text-sm text-gray-600">
                Estimated total: {money(total)}
              </p>
            )}
          </div>

          <div>
            <h3 className="font-semibold text-gray-800">Issues</h3>
            <ul className="list-none space-y-1">
              {brandIssue.map((bi, i) => (
                <li key={i}>
                  {bi?.brand && <span className="font-medium">{bi.brand}: </span>}
                  {bi?.issue ?? ""}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-800">Contact</h3>
            <p>
              {contact.firstName} {contact.lastName}
            </p>
            <p>{contact.email} · {contact.phone}</p>
            <p>
              {contact.address}{contact.unit && `, ${contact.unit}`}<br />
              {contact.city}, {contact.state} {contact.zipCode}
            </p>
          </div>
        </div>

        <p className="text-sm text-gray-500">
          A confirmation email has been sent to {contact.email}.
        </p>
        <Link to="/" class="btn-brand">Home</Link>
      </div>
    </div>
  );
}
