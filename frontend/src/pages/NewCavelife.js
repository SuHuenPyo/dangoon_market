import React from "react";
import HeaderLogo from "../components/HeaderLogo";
import PostForm from "../components/PostForm";
import RegexHelper from "../utils/RegexHelper";

import { useSelector, useDispatch} from "react-redux";
import { postNewCavelife,setInital } from "../Slices/CavelifeSlice";
import Meta from '../components/Meta';

/* 안내창 위치떄문에 여기 페이지는 main 제외 */
const NewCavelife = () => {
  const { rt, loading } = useSelector((state) => state.cavelife );
  const dispatch = useDispatch();
  const [notice, setNotice] = React.useState({
    title: null,
    subTitle: null,
    type: null,
  });

  const form = React.useRef();

  const doCavePost = async (e) => {
    e.preventDefault();

    const regex = new RegexHelper();

    if (!regex.value("postTitle", "제목을 입력해주세요.")) {
      return;
    }
    if (!regex.value("postContent", "내용을 입력해주세요.")) {
      return;
    }

    const postCaveForm = new FormData();

    postCaveForm.append("title", form.current.postTitle.value);
    postCaveForm.append("content", form.current.postContent.value);
    [...form.current.postImg.files].forEach((img,index)=>{
      postCaveForm.append('board', form.current.postImg.files[index]);
    });

    dispatch(postNewCavelife(postCaveForm));
  };

  React.useEffect(() => {
    console.log("rendering");

    if (rt === null) {
      console.log("if1");
      return;
    }

    if (!loading && rt === 200) {
      console.log("if2");
      setNotice({
        title: "등록이 완료되었습니다.",
        subTitle: null,
        type: "compelete",
      });

      return dispatch(setInital());
    }

    if (!loading && rt > 200) {
      console.log("if3");
      setNotice({
        title: "등록을 실패하였습니다.",
        subTitle: "다시 한번 시도해주세요.",
        type: "fail",
      });

      return dispatch(setInital());
    }

    return () => {
      setNotice({
        title: null,
        subTitle: null,
        type: null,
      });
    };
  }, [rt,loading]);

  return (
    <>
      <Meta title="동굴생활 글쓰기" description="단군마켓 동굴생활 글쓰기 페이지"  />
      <HeaderLogo />
      <PostForm
        title="동굴생활"
        onSubmit={doCavePost}
        ref={form}
        noticeTitle={notice.title}
        noticeSubTitle={notice.subTitle}
        noticeType={notice.type}
       loading={loading}
      />
    </>
  );
};

export default NewCavelife;
