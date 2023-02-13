import { api } from "@/utils/api";
import { NextPage } from "next";
import { useEffect, useMemo, useState } from "react";

interface Props {}

const SearchMusic: NextPage<Props> = () => {
  const [keyword, setKeyword] = useState<string>("");
  const [keywordList, setKeywordList] = useState<string[]>([]);
  const search = api.music.search.useMutation();

  useEffect(() => {
    if (keyword === "" || keyword.length < 3) {
        console.log("keyword is empty");
        setKeywordList([])
        return
    }
    
    const delayDebounceFn = setTimeout(() => {
      search.mutate({ keyword: keyword! });
    }, 2000);
    return () => clearTimeout(delayDebounceFn);
  }, [keyword]);

  useEffect(() => {
    if (search.isSuccess && keyword?.length > 0) {
      setKeywordList(search.data);
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
            {keywordList.map((keyword, i) => (
              <div key={i}>{keyword}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchMusic;
