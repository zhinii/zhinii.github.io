using UnityEngine;

public class player2 : MonoBehaviour
{
    void Update()
    {
        var x = Input.GetAxis("Horizontal1") * Time.deltaTime * 150.0f;
        var z = Input.GetAxis("Vertical1") * Time.deltaTime * 3.0f;

        transform.Rotate(0, x, 0);
        transform.Translate(0, 0, z);
    }
}