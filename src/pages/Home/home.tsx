import { IconSearch } from "@tabler/icons-react";
import Header from "../../components/Header/header";
import { getUserName } from "../../helpers/jwtHelper";
import Card from "../../components/Card/card";

const Home = () => {
  const userName = getUserName();
  console.log("Home", userName);
  return (
    <>
      <Header />
      <div className="flex-grow flex flex-col mb-10">
        <div className="flex justify-center py-5 border-b-2 mx-10">
          <div className="flex rounded-md border border-black focus-within:ring-1 focus-within:ring-black focus-within:border-none w-1/2">
            <input
              className="w-full h-10 rounded-md bg-transparent px-3 py-2 text-sm outline-none placeholder:text-gray-600 focus:outline-none focus:border-none"
              type="text"
              placeholder="Search by Title..."
            ></input>
            <button
              type="button"
              className="flex justify-center items-center text-white bg-black min-w-10 sm:min-w-20 rounded-r-md outline-none"
            >
              {<IconSearch />}
            </button>
          </div>
        </div>
        {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 place-items-center"> */}
        <div className="grid grid-cols-[repeat(auto-fit,_minmax(384px,_1fr))] gap-4 place-items-center mt-5">
          <Card
            title="Title"
            userName="UserName"
            blog="Lorem ipsum dolor sit amet consectetur adipisicing elit."
            like={10}
            comment={10}
          />
          <Card
            title="Title"
            userName="UserName"
            blog="Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci error impedit esse aliquid illum velit animi. Omnis hic excepturi sunt, enim accusantium facilis distinctio dolor incidunt fugiat soluta rerum eum!"
            like={10}
            comment={10}
          />
          <Card
            title="Title"
            userName="UserName"
            blog="Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci error impedit esse aliquid illum velit animi. Omnis hic excepturi sunt, enim accusantium facilis distinctio dolor incidunt fugiat soluta rerum eum!"
            like={10}
            comment={10}
          />
          <Card
            title="Title"
            userName="UserName"
            blog="Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci error impedit esse aliquid illum velit animi. Omnis hic excepturi sunt, enim accusantium facilis distinctio dolor incidunt fugiat soluta rerum eum!"
            like={10}
            comment={10}
          />
          <Card
            title="Title"
            userName="UserName"
            blog="Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci error impedit esse aliquid illum velit animi. Omnis hic excepturi sunt, enim accusantium facilis distinctio dolor incidunt fugiat soluta rerum eum!"
            like={10}
            comment={10}
          />
          <Card
            title="Title"
            userName="UserName"
            blog="Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci error impedit esse aliquid illum velit animi. Omnis hic excepturi sunt, enim accusantium facilis distinctio dolor incidunt fugiat soluta rerum eum!"
            like={10}
            comment={10}
          />
          <Card
            title="Title"
            userName="UserName"
            blog="Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci error impedit esse aliquid illum velit animi. Omnis hic excepturi sunt, enim accusantium facilis distinctio dolor incidunt fugiat soluta rerum eum!"
            like={10}
            comment={10}
          />
          <Card
            title="Title"
            userName="UserName"
            blog="Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci error impedit esse aliquid illum velit animi. Omnis hic excepturi sunt, enim accusantium facilis distinctio dolor incidunt fugiat soluta rerum eum!"
            like={10}
            comment={10}
          />
          <Card
            title="Title"
            userName="UserName"
            blog="Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci error impedit esse aliquid illum velit animi. Omnis hic excepturi sunt, enim accusantium facilis distinctio dolor incidunt fugiat soluta rerum eum!"
            like={10}
            comment={10}
          />
          <Card
            title="Title"
            userName="UserName"
            blog="Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci error impedit esse aliquid illum velit animi. Omnis hic excepturi sunt, enim accusantium facilis distinctio dolor incidunt fugiat soluta rerum eum!"
            like={10}
            comment={10}
          />
          <Card
            title="Title"
            userName="UserName"
            blog="Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci error impedit esse aliquid illum velit animi. Omnis hic excepturi sunt, enim accusantium facilis distinctio dolor incidunt fugiat soluta rerum eum!"
            like={10}
            comment={10}
          />
          <Card
            title="Title"
            userName="UserName"
            blog="Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci error impedit esse aliquid illum velit animi. Omnis hic excepturi sunt, enim accusantium facilis distinctio dolor incidunt fugiat soluta rerum eum!"
            like={10}
            comment={10}
          />
        </div>
      </div>
    </>
  );
};

export default Home;
