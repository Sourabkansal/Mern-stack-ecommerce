import React from "react";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { usercontext } from "../contextStore/usercontext";
import { useContext } from "react";

const login = () => {
  const { userdata, setuserdata } = useContext(usercontext);
  console.log(userdata);
  const navigate = useNavigate();
  const Button = ({ children, className, ...props }) => (
    <button className={`px-4 py-2 rounded-lg ${className}`} {...props}>
      {children}
    </button>
  );
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  let onsubmit = async (info) => {
    console.log(info);
    let response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/login`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(info),
    });
    let data = await response.json();
    console.log(data);
    localStorage.setItem("authToken", data.token);
    localStorage.setItem("alldata" , JSON.stringify(data))
    // console.log(data);
    setuserdata(data);
    console.log(userdata);

    const notify = () =>
      toast(
        response.status == 200
          ? "login Sucessfull"
          : "" || response.status == 401
          ? "Password is incorrect"
          : ""
      );
    notify();
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[rgba(254,169,40,0.4)] flex items-center justify-center px-4">
      <ToastContainer />
      <div className=" mt-5 sm:mt-0 w-lg sm:w-[60%] bg-white rounded-2xl shadow-lg p-6 flex flex-col md:flex-row md:space-x-6">
        {/* Left Section */}
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-800">Welcome back</h1>
          <p className="text-sm text-gray-500 mt-2">
            A brand new day is here. It’s your day to shape. Sign in and get
            started on shopping.
          </p>
          {/* Form */}
          <form className="mt-6 space-y-4" onSubmit={handleSubmit(onsubmit)}>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                placeholder="Example@email.com"
                className="mt-1 w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgba(254,169,40,0.4)]"
                {...register("email", {
                  required: { value: true, message: "Please enter email" },
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Enter valid email",
                  },
                })}
              />
              {errors.email && (
                <p className="text-red-700">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                placeholder="At least 8 characters"
                className="mt-1 w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgba(254,169,40,0.4)]"
                {...register("password", {
                  required: { value: true, message: "enter password" },
                })}
              />
              {errors.password && (
                <p className="text-red-700">{errors.password.message}</p>
              )}
            </div>

            <input
              type="submit"
              className="w-full bg-[rgba(254,169,40,0.6)] hover:bg-[rgba(254,169,40,0.6)] text-white py-3 rounded-lg"
            ></input>
          </form>
          {/* Or Sign in with */}
          <div className="my-6 text-center text-gray-500">Or</div>
          <div className="space-y-3">
            <Button className="w-full bg-white border text-gray-700 py-3 rounded-lg flex items-center justify-center">
              <img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMwAAADACAMAAAB/Pny7AAABOFBMVEX////qQzU0qFNChfT7vAU3gPTw9fqDq/Q0fvSkw/FvnvbqQTP7ugD7tQD/vQDqPC0spk7pNyYjpEj63tz/+/X++PjsWE3pMR786OfpLRgAnzoAnTP50M73wb797+7znpknefTt9u+p1bPA4Mj0pqLuc2v1sa3oGwDua2KzzPHh6vsRp1c/q1vZ7N3P59RwvILxjYfrT0PtYFb+9uRRjvH92pP8yE7814b94aXK2/Nit3a02bz+7s5RsWiDxJJ3pPKRyp7wg3z3q0TuZCj+6Lzxeij7wTfzjir2niXuaTf7uiPziDHpMjj9xwDtWzr80HT5qw/8zGPxhGONsvDUthKpwG+9tTBTqkqmsjjluh+Cr0TTvDuRsUDC16wOcfQOmmM6i9dKmcI6m543oIEwrCY3nJM7mKg+kcq+IYcGAAAKoklEQVR4nO2ceXvaxhaHQRYOiTBaMCDEZmGzxGERhLg2GIJvs9KkSeu2abrESXOTfP9vcEcCm00jzYxmJOHb319+HsdIr88654wTifyr/0el0yVVVVMLqWqplA76rbCVVlOFYu2obFR7maggyqbEaLdXvTCOaoVCSi0F/YaIUgFGudoTc0BZWRRF4VoioMrmcnU5UzWOioVUyI2kFgBHRjQhhChUwFTZ3IxIDfqNYUrVjGpGduZYRpKz2W714igV9HtvSq1Ve1FkkAWQHM1Uy+HiKVa7URETZOFzQrdXC0v8lAwBWISIZM4DUoN4EYbwKfTqWQ8gN0DZeq8QrHnSxUxd9k4yk1zvFoOrP2qxVxdpoZgSAU4w3qYWGzmqKDOcRgA46WI1R83BliXnqn47W8GQsyxQomYqEIyCjyhqOUMjg8FxMoZvvlZsyNSDZVWi3Kv5glIyomS1HkeCLFR9qDqFqMwcxcIRo0XWLEbdFxRTYs5gapx0pu4XCpCQa7Drp9MFkUlpgSvbLTIyTqkmMk5imxLlIyYVtGT4z2K6GouSo174k8U2lKtS7wdSjYBYotE67RSdygTHckQ5B4BKGRAKAxa6Z7CAWYJyMYE+C+seGc4iU2fpBsYilimzpHpBxT59FrXK6njsypKlzVK6YHk+dlSdNkvauD21MlK7RSzBJWX6LOngWGjHSyTS9ZaUzS2mbG0x5zI3nALC7kNgwFL2cN43Ny7grTPVcq1YSKmmCoVa+aLXvf6Ww8/K9FkKOXISOZrpXdRs18lq0ehluiI8s9CvlaDCZAgDRsxGTRCnz1ZrRqML2X+ysEvEIBtbynLGcCaZ8xSNRtYmJunXfaAiUXsp5xpHqMu8dKpmsxVhEPugJSPIZGK9gWKUpadsLHlYsESOCJyMZIenFnvL6zcmLAX86JdzZaIBV6km3vTlTFjSZdy0LNTJx8JqdX4sZ8ICSgymk8lZT7uhmjkwYVH3gUqY0S/IXqf1aVB1WOTkiDmNwWIRBQp7FIPGh9iohHfql7tU1o+M7poUsQyTzfi558bWf75/hR7/uUaoWZ4kpk9fIbNUw3XxbV3PEnzi+S1hOU/wQC+iKMbJMlygUtGJBcNPX7rHjRzu2AeGmfJz/eBmG7HL/NaBR71JXMO8fuFMI0T9ud5Crv2TGxj+9fTHKNzXBNkI+mXddDpdwAA9dQiYRlhu70L1ZoWF55//CLGNIIQ8kUUiD0/WYPgX39vD1MMeMMDL+HUYfs/W1bLVoF/VVfvfbbDwZjuw4WpCNvROZuNllt5utANb4GSRJ5teNtPLVRoxE4aL+y463bNn4V8/X6GhfpuFgR7+BDGM2Q4s5Wi5ugWGOZ9CYUDgvFxE/xYYJvIE5mWWpk+3yTD7jxxhzHbAMox8FPSbIsghZOZ6YWY1sRfyU4ylc1hivtHrtz+8At1y6DtMoHMXL5sZJ0pnTMZazvF/rbc/b0H42zdmNnpD8uH37zLRMRTGNf5NJaanJDD9eIyBDu7CnvfQNf4tmGcPSWDuxXYYKHZnFwaDFDKJn0hYWMH0YX6GlMz4xHchgtk5gMGgJbPpk1DBnEGe9wgt/olChhkMLAOsD2bsYZ4RsbCCiV/aP27f/si8DnMSKpjYPQjMMyQYsvhnBrNjn5v30coMUclkBrMTh8DsIcGchwvmAwwGgYXfCxkMpNAgwuyHDMa+0NwqGLTWbI+MhR3M/X9hwgkTt+9nthTmNlkG4maI2exWwYQtNXuCITvO+F40kQZNoWtnIDBb2TXDerNtPM/sfIDAbONJE3oE2MYZAOxwhjad4adkuZkVDOTYDF81r8KEam4W60Ng0IaA/KNQwTyGPG8LZ83QuRnqFuAkRFsA+EQTcnFmHYYsaFjB2LdmyJszsrLp9xYAKZ0lkr/8qpPAHMTieEKCiUNhENJZMvnbu9EhAczlHVz1EVigmRnlHkCS/517IE0IYHZxFbmHYhjoGtA9AyTf//GA45RBi4AGmx7Fy+ALWre7M8nkn+8AC6AZ+gBzhgQDW5xFXILGdLGZlDFJCsDUJQpMzAnGIWiS/B8PuGsakhSAKZRcHrsHTWaO15qS79/dsPhhmmOkZAaPf4egSfJ/PliwcJzWZg2D5GUO8Q90am+ZJP/XMoqZ0BibZhepY4jBmhlL57bJeZaRV6Qxjpr7aCXTIWTsj87Axd6ts3BSk61p7qAYxqFkWjq1Mcvv6ySzHMCS5ayP5GWOIWPjZ8DF7FjY5oDdS6Q2s+9QZSyt+Rko+vYsTB3tDCViwJHZMWQi639zkrR1sbmjdVixIBomBjsy32i52UwmN7LYim0qjGDO0M4yfcfEbGnRBCTfO5BYjsYmP+8iRb9zLzPX9d9pJvnfnMxiOdqIyVng8gDJMLE7CJ8187ONom9Lw6IROPuAxOKey0xZ5wCbom9LQ7/jPEYLGOBlzhVzrmkCuNhm0feH5hgtYIBcKuZcp3vmSR+JhTrN8WNEw0An5mvahxV9e5oORZpdpJ7M8jLYkHldf2sYMDSzwDEyi8P0b016U8KiGVFq044fI7PE+sifepjHgeEkjsq45riPHC87H1Dy8kz6SMGjoXEgOIuhj6MxDANMgxU1HAVX272LWCstQYf/dtLHeKYBNFrFSx7Q+2g9zExxtIJ5rTZeDjCljQ5JcfTJ1ccdjJ2H0yDTThNc04DI0cZtEpzWcKQo3Cd0mvhjLMOAJ2DmAEsKN8G2TqsyACggh/yDnswwDROJVDhsRzNxmuMhDk57MpDmvzXl80c028QvMQ0D1CGBAb/h5mCCmNn04XgkLRxAufqEkp1jSL3/mlr4OWDOIzVH7jytSmfEKSuPkLivCIEDuWLqogpB1FzjSFyzA8/VLWAS6x+t/5zyecctcDDT8o0GxDQWkKJpo/GwrS8x6a3DSqepKYoCsbqiuBUchDGGvWCPRJaiaHkgTQFmkGZfai4f+t9Pjp6GdPK3VcszDYHyXxwCB/GwbCvysPEgkKPhliHIZDciaAQo0FzB2gHn7ZKb9E4gNM2vtnONA9SzMkQtTymNVJL0+eNmjo47L5cQ1CZp0rzTKFff1nN0zFPAzHRI2gl4k8J9XaOB/EEGnoZELadnSdKX+HLgeAv+GwWSoDkzqy21A5RYTJpAbANc7du1baCXMbeIRvk6D36XxTIezWaL64sk7Yt5ZKPKAmiaAQWOdvUt5rbwx9YwkHrDWe0A7gDDXe1AegGg/Jg6S2CdjbfpIlT4c04KLOwu6lVwZ9BepTBaz1tq5301DuuLuiP/6qfE/vok2aiTQEqT1X2WJbUGfuBISsePu+ARvcK+gCqjiR8optpjiSmOIo2Z389dSD8caMx8TVJGbAolVK1hkxGOwlV8iZZVnInCAEfJj/1HsXDGGuWWQMoPWoT/44B36eM8RRwl78uf5jioAnIPDW+TJCkgB1vFGTVtNkeYJNxo4m8Gg6o9GTShCyR3EoUbdbD2uoylD8dkPIrCDcYB5GIX6eaKD77hszWJ1uxMhqEjmUlvDyedpuuqz+JQNBAmFeIrKv5Ib7crkwGnaeYe1p4CfGvUmRy2W+EmmUvXW63Dyrgz4uZbWVPmV3mlCSJk2G619K0AWUi31Gq124em2sASloJ+r63Q/wCbIp6gvvp17QAAAABJRU5ErkJggg=="
                alt="Google"
                className="w-5 h-5 mr-2"
              />{" "}
              Sign in with Google
            </Button>
            <Button className="w-full bg-white border text-gray-700 py-3 rounded-lg flex items-center justify-center">
              <img
                src="data:image/png;base64,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"
                alt="Facebook"
                className="w-5 h-5 mr-2"
              />{" "}
              Sign in with Facebook
            </Button>
          </div>
          <div className="mt-4 text-center text-sm text-gray-500">
            Don't have an account?{" "}
            <NavLink
              to={"/signup"}
              href="#"
              className="text-[rgba(254,169,40,0.6)] hover:underline"
            >
              Sign up
            </NavLink>
          </div>
        </div>

        <div className="hidden h-full md:block w-1/2 bg-[rgba(254,169,40,0.4)] rounded-2xl overflow-hidden">
          <img
            src="https://img.freepik.com/premium-photo/indian-family-with-shopping-bags-winter-wear-warm-clothes-against-background_466689-48811.jpg?w=740"
            alt="Leaf Pattern"
            className="w-full h-full "
          />
        </div>
      </div>
    </div>
  );
};

export default login;
