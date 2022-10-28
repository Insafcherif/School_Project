//add level data

const addSubjecttoLevel = async (req, res) => {
    try {
      const subjects = await Subject.find();
      const math = await Subject.findOne({ subjectdfName: "Math" });
      const arabic = await Subject.findOne({ subjectdfName: "Arabic" });
      const english = await Subject.findOne({ subjectdfName: "English" });
      const islamEduc = await Subject.findOne({
        subjectdfName: "Islamic Education",
      });
      const music = await Subject.findOne({ subjectdfName: "Music" });
      const newLevel = new Level({
        levelNumber: 1,
        levelPrice: 3500,
        subject_id: [math._id, arabic._id, english._id, islamEduc._id, music._id],
      });
      console.log(newLevel.subject_id);
      await newLevel.save();
      res.status(200).json({
        errors: [{ msg: "Added successfully" }],
        newLevel: newLevel,
      });
    } catch (error) {
      res.status(500).json({ errors: [{ msg: "Adding  new data is failed" }] });
    }
  };