using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class hitMe : MonoBehaviour {

		public GameObject item; //ibjecr we want to grab
	public GameObject tempParent;  //object we want to attached it to when picked up until its dropped
	public Transform guide;  //position we want it to sit when picked up
	public Transform drop; //where the object will go when dropped.

	bool playerInTrigger; ///this is used to indicate player is in 'hit zone'

//this detect if player 1 is in 'hit area' to pick up object
	void OnTriggerEnter (Collider col)
	{
		if(col.gameObject.name == "player1")
	{
			Debug.Log("hit");

		playerInTrigger = true;
	
	}

}

//this says if player is in 'hit area' and they press the right key, they will pick up object
	void Update(){
		if(playerInTrigger && Input.GetKeyDown("space")){
           item.GetComponent<Rigidbody>().useGravity = false;
		item.GetComponent<Rigidbody>().isKinematic = true;
		item.transform.position = guide.transform.position;
		item.transform.rotation = guide.transform.rotation;
		item.transform.parent = tempParent.transform;
	}
	}
}