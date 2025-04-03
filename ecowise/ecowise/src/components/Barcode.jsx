import { useEffect, useState } from "react";
import { DataCaptureContext, configure } from "@scandit/web-datacapture-core";
import { barcodeCaptureLoader } from "@scandit/web-datacapture-barcode";

const BarcodeScanner = () => {
  const [context, setContext] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initScanner = async () => {
      try {
        console.log("Initializing scanner...");
        await configure({
          libraryLocation: "https://cdn.jsdelivr.net/npm/@scandit/web-datacapture-core@latest",
          licenseKey: "AmBVgDtdHZNPG18CPNJtF6YARpP2P9ZpcyhTvxEdAZniQLQLdk2Xj8huGT4FAoXt0XPrl0x+NPEWd/V8S2dsOcNRYBU/cuy2txkTFjkR25QiBnJHKzTLs58TDsVBQkOXXHcupPt/V3KHWF48ilsN+bV11bC3YPKEb3OAu2YWBCd5DS9wsUPwabJ3V8uEX9KWUmqVmGlsB37uT2RzfFrlmxdeZhR3E0Q06VYAaHZCNOlsTDYC/XAEklNZqUPxE+rN10+VwPl40bLOFQUDV2pwtQZ3GXMMd2TlPEFGHJNxDcDYeLt7BmOPESNCKHLqdjViZG5FGhhdvszVZsDhaSXp/RtkL+t4QoWo6Fet5IoAS9FHbFG1BFNzdOdju3xQOEp9/GvoMYZlpVZMccs0LzJw1okzYx5xVQCmMmdwuPRShaWiZLhjq2/kHyVM7m4EeShSfUD1Y9pROxYadL6yjiOHHcUR8lnxWOaiHUWJt4RznEg6farzuSrPR9dz9+K4WYmO+H5seklJS5TJZAUzETbMgPMDs8bCGKzHSpyPn/vLJNQuS9KK7CxbWj/+gnuRH2KMPUk715luolewjtX198kH0NMf3ZpyEtrDH5aZAJmYdhv0z51voXaMXhgkBuImaKZC020ebNWU1MHLOItToqtLI/gCTA+wQvIukZr++y9cFWr77h77/PvcGw+Q5FOrS2+S0rbx467ntAYxR7AycUY2V5DEOae2vTgyptaXTkdXEqgTaGDqeMYaeZ3e4u/RIdpwHE29ATSbKwASDeGDv9v4TLLLiyE5NuiYSWoHHP9RRC4x5DB25kMgTvTuIRAJB26tfMrho+FhAN+G13/Y8OdGgA+c+/7Mkf27l/nk1vj8DPtRBuhoB+VWJ3LY8v6BkNDdw0lD1nbu+AonJclmlOlbbaMOgck2846BzG6aEJGbSJKuCg5Wjr+rjH+e6NAocSV6DYtFBtuKXaxTV2jtXE9hnC4jCPOhJX/6Wb8SMvuU3vkBcddtBXVdh+sklVFkA6BGPmtnHZXVoLHDDlnPFc7TUgiMiOymPcaSNgx7Dw/mNewiETAMqh5M04PVwp72JxXILxACDcH/JrMxMsVsOxOBAXT6eqETzYJKRM3llDQ79xDG1SP2z84V5MMpZtKB9nupLGxfzVJIE8eE9398JC71uE9FGgQLApx5wcv33U1OrLBchFwEOOc7FmB5WZO5BeWG1gI=",
          moduleLoaders: [barcodeCaptureLoader()],
        });

        const dataCaptureContext = await DataCaptureContext.create();
        setContext(dataCaptureContext);
        console.log("Scanner initialized successfully");
      } catch (err) {
        console.error("Error initializing scanner:", err);
        setError(err.message);
      }
    };

    initScanner();
  }, []);

  return (
    <div>
      <h1>Barcode Scanner</h1>
      {context ? <p>Scanner is ready!</p> : <p>Loading scanner...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
    </div>
  );
};

export default BarcodeScanner;
