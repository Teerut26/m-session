import { api } from "@/utils/api";
import { NextPage } from "next";
import { MusicVideo } from "node-youtube-music";
import { useEffect, useState } from "react";
import Music from "./Music";

interface Props {}

const SearchMusic: NextPage<Props> = () => {
  const [keyword, setKeyword] = useState<string>("");
  const [result, setResult] = useState<MusicVideo[] | undefined>(undefined);
  const search = api.music.search.useMutation();

  useEffect(() => {
    if (keyword === "" || keyword.length < 2) {
      setResult(undefined);
      return;
    }

    const delayDebounceFn = setTimeout(() => {
      search.mutate({ keyword: keyword! });
    }, 1300);
    return () => clearTimeout(delayDebounceFn);
  }, [keyword]);

  useEffect(() => {
    if (search.isSuccess && keyword?.length > 0) {
      setResult(search.data);
      search.reset();
    }
  }, [search]);

  return (
    <div className="flex flex-1 flex-col rounded-xl bg-base-200 p-3">
      <div className="flex h-full flex-col gap-3">
        <div className="text-xl">Search Music</div>
        <input
          onChange={(e) => setKeyword(e.target.value)}
          type="text"
          className="input"
        />
        <div className="h-full flex-grow-0 overflow-y-auto">
          <div className="flex flex-col divide-y">
            {result?.map((item, i) => (
              <Music clickType="addQueue" item={item} key={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchMusic;
