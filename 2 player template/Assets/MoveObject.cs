// using System.Collections;
// using System.Collections.Generic;
// using UnityEngine;

// public class MoveObject : MonoBehaviour {

// 	public GameObject item; //ibjecr we want to grab
// 	public GameObject tempParent;  //object we want to attached it to when picked up until its dropped
// 	public Transform guide;  //position we want it to sit when picked up
// 	public Transform drop; //where the object will go when dropped.
// 	// Use this for initialization
// 	void Start () {
// 		item.GetComponent<Rigidbody>().useGravity = true;
// 	}
	
// 	// Update is called once per frame
// 	void Update () {
// 		//picks up ball
// 		if (Input.GetKeyDown("space")){
//            item.GetComponent<Rigidbody>().useGravity = false;
// 		item.GetComponent<Rigidbody>().isKinematic = true;
// 		item.transform.position = guide.transform.position;
// 		item.transform.rotation = guide.transform.rotation;
// 		item.transform.parent = tempParent.transform;
// 	}
// 	///drops ball
// 	  if (Input.GetKeyDown("return")){
// 	  item.GetComponent<Rigidbody>().useGravity = true;
// 		item.GetComponent<Rigidbody>().isKinematic = false;
// 		item.transform.parent = null;
// 		item.transform.position = drop.transform.position;
// 	}
// 	}

	


// }
