use super::json_writer::ConstraintJSON;

#[derive(Clone)]
pub struct DebugWriter {
    pub json_constraints: String,
    pub json_constraints_ext: String,
}

impl DebugWriter {
    pub fn new(c: String) -> Result<DebugWriter, ()> {
        let c_ext = c.strip_suffix(".json").unwrap();
        let c_ext = format!("{}_ext.json", c_ext);
        Result::Ok(DebugWriter { json_constraints: c, json_constraints_ext: c_ext })
    }

    pub fn build_constraints_file(&self) -> Result<ConstraintJSON, ()> {
        ConstraintJSON::new(&self.json_constraints)
    }

    pub fn build_constraints_ext_file(&self) -> Result<ConstraintJSON, ()> {
        ConstraintJSON::new(&self.json_constraints_ext)
    }
}
