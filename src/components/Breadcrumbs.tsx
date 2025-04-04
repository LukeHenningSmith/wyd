import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useMemo } from "react";
import { formatBreadcrumb } from "@/util";

const HOME = { id: "/", label: "Home", path: "/" };

export function Breadcrumbs() {
  const navigate = useNavigate();

  const location = useLocation();

  const breadcrumbConfig = useMemo(() => {
    const pathnames = location.pathname.split("/").filter((x) => x);
    if (pathnames.length === 0) {
      return [HOME];
    } else {
      return pathnames.map((_, index) => {
        const path = `/${pathnames.slice(0, index + 1).join("/")}`;
        const label =
          path === "/" ? "Home" : formatBreadcrumb(pathnames[index]);

        return {
          id: path,
          label,
          path,
        };
      });
    }
  }, [location]);

  return (
    <Breadcrumb className="mt-[5.5rem] mb-4 mx-8">
      <BreadcrumbList>
        {breadcrumbConfig.map((item, index) => (
          <>
            <BreadcrumbItem key={item.id}>
              <BreadcrumbLink onClick={() => navigate(item.path)}>
                {item.label}
              </BreadcrumbLink>
            </BreadcrumbItem>
            {index !== breadcrumbConfig.length - 1 && <BreadcrumbSeparator />}
          </>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
