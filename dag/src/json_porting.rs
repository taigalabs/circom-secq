use super::{Tree, DAG};
use circom_algebra::algebra::Constraint;
use circom_algebra::num_bigint::BigInt;
use constraint_writers::debug_writer::DebugWriter;
use constraint_writers::json_writer::ConstraintJSON;
use json::JsonValue;
use std::collections::HashMap;

type C = Constraint<usize>;

fn transform_constraint_to_json(constraint: &C) -> JsonValue {
    JsonValue::Array(vec![
        hashmap_as_json(constraint.a()),
        hashmap_as_json(constraint.b()),
        hashmap_as_json(constraint.c()),
    ])
}

fn hashmap_as_json(values: &HashMap<usize, BigInt>) -> JsonValue {
    let mut order: Vec<&usize> = values.keys().collect();
    order.sort();
    let mut correspondence = json::object! {};
    for i in order {
        let (key, value) = values.get_key_value(i).unwrap();
        let value = value.to_str_radix(10);
        correspondence[format!("{}", key)] = value.as_str().into();
    }
    correspondence
}

fn ext_hashmap_as_json(
    id_to_name: &HashMap<usize, String>,
    values: &HashMap<usize, BigInt>,
) -> JsonValue {
    let mut order: Vec<&usize> = values.keys().collect();
    order.sort();
    let mut correspondence = json::object! {};
    for i in order {
        let (key, value) = values.get_key_value(i).unwrap();
        let value = value.to_str_radix(10);

        println!("key: {}, map: {:?}", key, id_to_name);

        let name = if *key == 0 {
            "constant".to_string()
        } else {
            if let Some(n) = id_to_name.get(key) {
                n.to_string()
            } else {
                panic!();
                // key.to_string()
            }
        };

        correspondence[format!("{}", name)] = value.as_str().into();
    }
    correspondence
}

fn visit_tree(tree: &Tree, writer: &mut ConstraintJSON) -> Result<(), ()> {
    println!("visit_tree: {:?}", tree.id_to_name);

    for constraint in &tree.constraints {
        let json_value = transform_constraint_to_json(&constraint);
        writer.write_constraint(&json_value.to_string())?;
    }
    for edge in Tree::get_edges(tree) {
        let subtree = Tree::go_to_subtree(tree, edge);
        visit_tree(&subtree, writer)?;
    }
    Result::Ok(())
}

pub fn port_constraints(dag: &DAG, debug: &DebugWriter) -> Result<(), ()> {
    println!("port_constraints(): constraint count: {}", &Tree::new(dag).constraints.len());

    let mut writer = debug.build_constraints_file()?;
    visit_tree(&Tree::new(dag), &mut writer)?;
    writer.end().unwrap();

    let mut id_to_names = HashMap::new();
    get_names(&Tree::new(dag), &mut id_to_names);

    println!("map: {:?}", id_to_names);

    let mut writer_ext = debug.build_constraints_ext_file()?;
    visit_tree_ext(&Tree::new(dag), &mut writer_ext, &id_to_names)?;
    writer_ext.end().unwrap();

    Ok(())
}

fn visit_tree_ext(
    tree: &Tree,
    writer: &mut ConstraintJSON,
    id_to_names: &HashMap<usize, String>,
) -> Result<(), ()> {
    println!("visit_tree_ext: {:?}, node_id: {}, {}", tree.id_to_name, tree.node_id, tree.path);

    for constraint in &tree.constraints {
        // let json_value = transform_constraint_to_json(&constraint);

        let json_value = JsonValue::Array(vec![
            ext_hashmap_as_json(&id_to_names, constraint.a()),
            ext_hashmap_as_json(&id_to_names, constraint.b()),
            ext_hashmap_as_json(&id_to_names, constraint.c()),
        ]);

        writer.write_constraint(&json_value.to_string())?;
    }
    for edge in Tree::get_edges(tree) {
        let subtree = Tree::go_to_subtree(tree, edge);

        println!("-- visit_tree_ext: {:?}", subtree.id_to_name);
        visit_tree_ext(&subtree, writer, &id_to_names)?;
    }
    Result::Ok(())
}

fn get_names(tree: &Tree, id_to_names: &mut HashMap<usize, String>) {
    println!("visit_tree_ext: {:?}, node_id: {}, {}", tree.id_to_name, tree.node_id, tree.path);

    // ext_hashmap_as_json(&tree.id_to_name);
    for (id, name) in tree.id_to_name.iter() {
        if let None = id_to_names.get(id) {
            let val = format!("{}.{}", tree.path, name);
            if let Some(p) = val.strip_prefix("main.") {
                id_to_names.insert(*id, p.to_string());
            }
        }
    }

    for edge in Tree::get_edges(tree) {
        let subtree = Tree::go_to_subtree(tree, edge);

        println!("-- visit_tree_ext: {:?}", subtree.id_to_name);
        get_names(&subtree, id_to_names);
    }
}
