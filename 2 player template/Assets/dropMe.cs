// this script ccreate a 'drop area' for player to place a picked up object.
//it is applied to the place we want to drop. Create an empty object and apply this script to it.
//the empty object is the 'area' that player must breach. this empty object must be a box collider

using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class dropMe : MonoBehaviour {


		public GameObject item; //object we want to drop
	public Transform drop; //where the object will go when dropped.

	bool playerInTrigger; ///this is used to indicate player is in 'drop zone'

//this detect if player 1 is in 'drop area' to drop object
	void OnTriggerEnter (Collider col)
	{
		if(col.gameObject.name == "player1")
	{
			Debug.Log("hit");

		playerInTrigger = true;
	
	}

}

//this says if player is in 'drop area' and they press the right key, they will pick up object
	void Update(){
		if(playerInTrigger && Input.GetKeyDown("return")){
           item.GetComponent<Rigidbody>().useGravity = true;
		item.GetComponent<Rigidbody>().isKinematic = false;
		item.transform.parent = null;
		item.transform.position = drop.transform.position;
	}
	}
}