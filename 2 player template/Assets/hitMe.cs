// script is used to define what object is being picked up and which player can pick it up
//create an 'empty' game object and make it a child of the object to be picked up. 
//the size of the 'empty' object if the 'hit area' this object must have 'box collider', i.e. the are the player must breach in order for code to be active

using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class hitMe : MonoBehaviour {

		public GameObject item; //oject we want to grab
	public GameObject tempParent;  //object we want to attached it to when picked up until its dropped
	public Transform guide;  //position we want it to sit when picked up this is another empty object that is attached to a player

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
	//this detects if player has left the 'hit area' and disbales ability to pick up object
		void OnTriggerExit(Collider col)
	{
		if(col.gameObject.name == "player1")
	{
			Debug.Log("exit");

		playerInTrigger = false;
	
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