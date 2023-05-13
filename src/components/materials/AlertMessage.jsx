import { Alert } from "@material-tailwind/react";
import {
  XCircleIcon,
  InformationCircleIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";

const AlertMessage = ({ status, msg }) => {
  let color, icon;

  switch (status) {
    case "error":
      color = "red";
      icon = <XCircleIcon strokeWidth={2} className="h-6 w-6" />;
      break;
    case "success":
      color = "green";
      icon = <CheckCircleIcon strokeWidth={2} className="h-6 w-6" />;
      break;
    case "warning":
      color = "amber";
      icon = <ExclamationTriangleIcon strokeWidth={2} className="h-6 w-6" />;
      break;

    default:
      color = "blue";
      icon = <InformationCircleIcon strokeWidth={2} className="h-6 w-6" />;
      break;
  }

  return (
    <Alert
      color={color}
      className="mt-4"
      variant="gradient"
      icon={icon}
      open={open}
      onClose={() => setOpen(false)}
    >
      {msg}
    </Alert>
  );
};

export default AlertMessage;
