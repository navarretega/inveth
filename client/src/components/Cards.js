import React, { useContext, useState, useEffect } from "react";

import EthContext from "../EthContext";
import Card from "./Card";
import { projectsDB } from "../data";

function Cards() {
  const eth = useContext(EthContext);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const init = async () => {
      const { accounts, projectFInstance } = eth;
      const projectsAddressess = await projectFInstance.methods.getDeployedProjects().call({ from: accounts[0] });
      if (projectsAddressess) {
        let data = [];
        projectsAddressess.map(async (pAddr) => {
          let obj = projectsDB.filter((c) => {
            return c.address === pAddr;
          });
          data.push(obj[0]);
        });
        setProjects(data);
      }
    };
    init();
  }, [eth]);

  return (
    <div className="mt-10 max-w-7xl mx-auto sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((c, index) => (
          <Card
            key={c.address}
            address={c.address}
            imageUrl={c.imageUrl}
            location={c.location}
            title={c.title}
            subTitle={c.subTitle}
            minTokens={c.minTokens}
          />
        ))}
      </div>
    </div>
  );
}

export default Cards;
