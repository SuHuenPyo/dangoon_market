import React from "react";
import HeaderLogo from "../components/HeaderLogo";
import PostForm from "../components/PostForm";
import RegexHelper from "../utils/RegexHelper";

import { useSelector, useDispatch } from "react-redux";
import { postNewCavelife } from "../Slices/CavelifeSlice";

/* 안내창 위치떄문에 여기 페이지는 main 제외 */
const NewCavelife = () => {
  const { rt, loading } = useSelector((state) => state.cavelife);
  const dispatch = useDispatch();
  const [notice, setNotice] = React.useState({
    title: null,
    subTitle: null,
    type: null,
  });

  const form = React.useRef();


  const doCavePost = async(e) => {
    e.preventDefault();

    const regex = new RegexHelper();

    if (!regex.value("postTitle", "제목을 입력해주세요.")) {
      return;
    }
    if (!regex.value("postContent", "내용을 입력해주세요.")) {
      return;
    }

    const postCaveForm = new FormData();

    postCaveForm.append("memberId", 1);
    postCaveForm.append("title", form.current.postTitle.value);
    postCaveForm.append("content", form.current.postContent.value);
    postCaveForm.append("board", form.current.postImg.files);

    await dispatch(postNewCavelife(postCaveForm));
  };

  React.useEffect(() => {
    if(rt === null){
      return;
    }

    if (rt === 200) {
      setNotice({
        title: "등록이 완료되었습니다.",
        subTitle: null,
        type: "compelete",
      });
    }

    if (rt !== 200) {
      setNotice({
        title: "등록을 실패하였습니다.",
        subTitle: "다시 한번 시도해주세요.",
        type: "fail",
      });
    }

  }, [dispatch]);

  return (
    <>
      <HeaderLogo />
      <PostForm
        title="동굴생활"
        onSubmit={doCavePost}
        ref={form}
        noticeTitle={notice.title}
        noticeSubTitle={notice.subTitle}
        noticeType={notice.type}
      />
    </>
  );
};

export default NewCavelife;
